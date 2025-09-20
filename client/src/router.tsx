import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import TaskManager from "./pages/TaskManager";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "task-manager", element: <TaskManager /> },
    ],
  },
]);
