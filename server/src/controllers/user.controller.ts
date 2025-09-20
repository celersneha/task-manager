import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import type { HydratedDocument } from "mongoose";
import type { IUserDocument } from "../types/types";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId: Object) => {
  try {
    if (!userId) throw new ApiError(400, "User ID is required");

    const user = (await User.findById(
      userId
    )) as HydratedDocument<IUserDocument> | null;

    if (!user) throw new ApiError(404, "User not found");

    const accessToken = await user.generateAccessToken();

    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

//Registration of user logic
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

//Login of user logic
const loginUser = asyncHandler(async (req, res) => {
  //req body se data lena hai
  //user details enter karvani hai jaise username ya email
  //check karna hai ki user exist karta hai ya nhi
  //agar nhi exist karta toh error throw karna hai
  //exist karta hai toh password check karna hai
  //password correct na ho toh error dena hai
  //password correct hone pe access token aur refresh token generate karna hai
  //send cookie
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(401, "Either username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "User credentials are invalid");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

//logout of user logic
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

//refresh access token logic
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies["RefreshToken"] || req.body["RefreshToken"];

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET!
  );
  // console.log(decodedToken);
  const userId =
    typeof decodedToken === "object" && "_id" in decodedToken
      ? (decodedToken._id as string)
      : undefined;

  if (!userId) {
    throw new ApiError(401, "Invalid Refresh Token");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }

  if (user?.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Refresh Token is either expired or used");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken: refreshToken },
        "Access Token refreshed successfully"
      )
    );
});

//get current user logic
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  generateAccessAndRefreshToken,
};
