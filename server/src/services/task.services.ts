import { Task } from "../models/task.model";
import { ApiError } from "../utils/ApiError";
import { Types } from "mongoose";

export const createTask = async (taskData: {
  title: string;
  description?: string;
  isCompleted?: boolean;
  userId: string;
}) => {
  const { title, description, isCompleted, userId } = taskData;

  const task = await Task.create({
    title,
    description,
    isCompleted: isCompleted ?? false,
    user: userId,
  });

  return task;
};

export const findTaskByIdAndUser = async (taskId: string, userId: string) => {
  const task = await Task.findOne({ _id: taskId, user: userId });

  if (!task) {
    throw new ApiError(404, "Task not found or unauthorized");
  }

  return task;
};

export const updateTaskById = async (
  taskId: string,
  userId: string,
  updateData: {
    title?: string;
    description?: string;
    isCompleted?: boolean;
  }
) => {
  const task = await findTaskByIdAndUser(taskId, userId);

  const { title, description, isCompleted } = updateData;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (isCompleted !== undefined) task.isCompleted = isCompleted;

  await task.save();
  return task;
};

export const deleteTaskById = async (taskId: string, userId: string) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

  if (!task) {
    throw new ApiError(404, "Task not found or unauthorized");
  }

  return task;
};

export const getTasksByUser = async (userId: string) => {
  const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
  return tasks;
};

export const validateTaskData = (title: string, userId?: string) => {
  if (!title || !userId) {
    throw new ApiError(400, "Title and user are required");
  }
};
