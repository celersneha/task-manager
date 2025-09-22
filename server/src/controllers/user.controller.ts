import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import {
  getUserById,
  getUserByIdWithoutSensitiveData,
  checkUserExists,
  createUser,
  generateTokensForUser,
  validateUserCredentials,
  clearUserRefreshToken,
} from "../services/user.services.js";

import type { CookieOptions } from "express";

const setCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
});

//Registration of user logic
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, password, username].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  await checkUserExists(email, username);

  const { user, createdUser } = await createUser({
    fullName,
    email,
    password,
    username,
  });

  const { accessToken, refreshToken } = await generateTokensForUser(user._id);
  const options = setCookieOptions();

  return res
    .status(201)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user: createdUser,
          accessToken,
          refreshToken,
        },
        "User registered and logged in successfully"
      )
    );
});

//Login of user logic
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(401, "Either username or email is required");
  }

  const user = await validateUserCredentials(email, username, password);

  const { accessToken, refreshToken } = await generateTokensForUser(user._id);

  const loggedInUser = await getUserByIdWithoutSensitiveData(user._id);
  const options = setCookieOptions();

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
  await clearUserRefreshToken(req.user?._id);
  const options = setCookieOptions();

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

  const userId =
    typeof decodedToken === "object" && "_id" in decodedToken
      ? (decodedToken._id as string)
      : undefined;

  if (!userId) {
    throw new ApiError(401, "Invalid Refresh Token");
  }

  const user = await getUserById(userId);

  if (user?.refreshToken !== incomingRefreshToken) {
    throw new ApiError(401, "Refresh Token is either expired or used");
  }

  const options = setCookieOptions();
  const { accessToken, refreshToken } = await generateTokensForUser(user._id);

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
  console.log("Current User:", req.user);
  console.log(process.env.CLIENT_URL);
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
};
