import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.["AccessToken"] ||
      req.header("Authorization")?.replace("Bearer ", ""); //

    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    const userId =
      typeof decodedToken === "object" &&
      decodedToken !== null &&
      "_id" in decodedToken
        ? (decodedToken as { _id: string })._id
        : undefined;

    if (!userId) {
      throw new ApiError(401, "Invalid access token");
    }

    const user = await (User as any)
      .findById(userId)
      .select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error: any) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
