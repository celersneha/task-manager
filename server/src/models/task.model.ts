import mongoose, { Schema } from "mongoose";
import type { ITaskDocument } from "../types/types.js";

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
export const Task =
  (mongoose.models.Task as mongoose.Model<ITaskDocument>) ||
  mongoose.model<ITaskDocument>("Task", taskSchema);
