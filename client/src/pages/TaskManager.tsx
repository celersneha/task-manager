import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import InputForm from "../components/ui/TaskManager/InputForm";
import TasksList from "../components/ui/TaskManager/TasksList";
import withAuth from "@/utils/AuthWrapper";

interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

function TaskManager() {
  const { user } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleTaskAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleEditComplete = () => {
    setEditingTask(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[color:var(--accent)] drop-shadow">
            Welcome back, {user?.fullName || user?.username}!
          </h1>
          <p className="text-[color:var(--muted-foreground)] mt-2">
            Manage your tasks efficiently and stay productive.
          </p>
        </div>

        {/* Task Input Form */}
        <InputForm
          onTaskAdded={handleTaskAdded}
          editTask={editingTask || undefined}
          onEditComplete={handleEditComplete}
        />

        {/* Tasks List */}
        <div className="bg-[color:var(--card)] rounded-xl shadow-lg p-6 border border-[color:var(--border)]">
          <h2 className="text-xl font-bold mb-4 text-[color:var(--primary)]">
            Your Tasks
          </h2>
          <TasksList
            refreshTrigger={refreshTrigger}
            onEditTask={handleEditTask}
          />
        </div>
      </div>
    </div>
  );
}

const AuthenticatedTaskManager = withAuth(TaskManager);
export default AuthenticatedTaskManager;
