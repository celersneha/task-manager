import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route";
import taskRoutes from "./routes/task.route";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;

declare global {
  namespace Express {
    interface Request {
      auth?: any;
    }
  }
}

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the backend API!" });
});

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Something went wrong!";
    res.status(statusCode).json({ message });
  }
);

export default app;
