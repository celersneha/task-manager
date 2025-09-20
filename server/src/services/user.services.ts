import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { HydratedDocument } from "mongoose";
import type { IUserDocument } from "../types/types.js";

export const getUserById = async (
  userId: string
): Promise<HydratedDocument<IUserDocument>> => {
  const user = (await User.findById(
    userId
  )) as HydratedDocument<IUserDocument> | null;

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const getUserByIdWithoutSensitiveData = async (userId: string) => {
  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const findUserByEmailOrUsername = async (
  email?: string,
  username?: string
) => {
  if (!email && !username) {
    throw new ApiError(400, "Either email or username is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  return user;
};

export const checkUserExists = async (email: string, username: string) => {
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
};

export const createUser = async (userData: {
  fullName: string;
  email: string;
  password: string;
  username: string;
}) => {
  const user = await User.create({
    ...userData,
    username: userData.username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return { user, createdUser };
};

export const clearUserRefreshToken = async (userId: string) => {
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
};

export const generateTokensForUser = async (userId: string) => {
  try {
    if (!userId) throw new ApiError(400, "User ID is required");

    const user = await getUserById(userId);

    // Remove 'await' - these are synchronous methods
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Update user's refresh token in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error in generateTokensForUser:", error);
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

export const validateUserCredentials = async (
  email: string,
  username: string,
  password: string
) => {
  const user = await findUserByEmailOrUsername(email, username);

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "User credentials are invalid");
  }

  return user;
};
