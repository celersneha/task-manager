import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createTask,
  updateTaskById,
  deleteTaskById,
  getTasksByUser,
  validateTaskData,
} from "../services/task.services";

// Add Task
const addTask = asyncHandler(async (req, res) => {
  const { title, description, isCompleted } = req.body;
  const userId = req.user?._id;

  validateTaskData(title, userId);

  const task = await createTask({
    title,
    description,
    isCompleted,
    userId,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

// Update Task
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  const userId = req.user?._id;
  if (!id) {
    throw new Error("Task ID is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  const task = await updateTaskById(id, userId, {
    title,
    description,
    isCompleted,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task updated successfully"));
});

// Delete Task
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  if (!id) {
    throw new Error("Task ID is required");
  }
  if (!userId) {
    throw new Error("User ID is required");
  }

  await deleteTaskById(id, userId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Task deleted successfully"));
});

//  Get All Tasks for Current User
const getAllTasks = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const tasks = await getTasksByUser(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, tasks, "Tasks fetched successfully"));
});

export { addTask, updateTask, deleteTask, getAllTasks };
