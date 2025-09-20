import API from "@/lib/api";

export const taskAPI = {
  getAllTasks: () => API.get("/tasks"),

  createTask: (taskData: { title: string; description?: string }) =>
    API.post("/tasks", taskData),

  updateTask: (
    id: string,
    taskData: { title?: string; description?: string; isCompleted?: boolean }
  ) => API.put(`/tasks/${id}`, taskData),

  deleteTask: (id: string) => API.delete(`/tasks/${id}`),

  toggleTask: (id: string, isCompleted: boolean) =>
    API.put(`/tasks/${id}`, { isCompleted }),
};
