import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUserDocument } from "../types/types.js";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const secret = process.env.ACCESS_TOKEN_SECRET as string;
  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    secret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY ?? ("1h" as any),
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  const secret = process.env.REFRESH_TOKEN_SECRET as string;
  if (!secret) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }
  return jwt.sign(
    {
      _id: this._id,
    },
    secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY ?? ("7d" as any),
    }
  );
};

// Export with proper typing
export const User =
  (mongoose.models.User as mongoose.Model<IUserDocument>) ||
  mongoose.model<IUserDocument>("User", userSchema);
