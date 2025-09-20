import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.route";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;
// Extend Express Request type to include 'auth'
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

// Add error handling middleware
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ error: "Something went wrong!" });
  }
);

export default app;
