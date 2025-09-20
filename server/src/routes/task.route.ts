import { Router } from "express";
import { addTask, updateTask, deleteTask, getAllTasks } from "../controllers/task.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// All routes require authentication
router.use(verifyJWT);

// Task CRUD routes
router.route("/").get(getAllTasks).post(addTask);
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;