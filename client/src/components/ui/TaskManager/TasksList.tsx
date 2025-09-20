import { useState, useEffect } from "react";
import { taskAPI } from "@/api/taskApi";
import { Button } from "@/components/ui/button";

interface Task {
  _id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TasksListProps {
  refreshTrigger: number;
  onEditTask: (task: Task) => void;
}

const TasksList = ({ refreshTrigger, onEditTask }: TasksListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllTasks();
      setTasks(response.data.data || []);
      setError("");
    } catch (err: unknown) {
      setError(
        (err as any)?.response?.data?.message || "Failed to fetch tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const handleToggleComplete = async (
    taskId: string,
    currentStatus: boolean
  ) => {
    try {
      await taskAPI.toggleTask(taskId, !currentStatus);

      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, isCompleted: !currentStatus } : task
        )
      );
    } catch (err: unknown) {
      setError(
        (err as any)?.response?.data?.message || "Failed to update task"
      );
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await taskAPI.deleteTask(taskId);

      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err: unknown) {
      setError(
        (err as any)?.response?.data?.message || "Failed to delete task"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={fetchTasks}>Retry</Button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No tasks yet. Create your first task above!
        </p>
      </div>
    );
  }

  const completedTasks = tasks.filter((task) => task.isCompleted);
  const pendingTasks = tasks.filter((task) => !task.isCompleted);

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 text-[color:var(--primary)]">
            Pending Tasks ({pendingTasks.length})
          </h3>
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={onEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-3 text-[color:var(--accent)]">
            Completed Tasks ({completedTasks.length})
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={onEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string, currentStatus: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskItemProps) => {
  return (
    <div
      className={`p-4 border rounded-xl shadow-sm transition-colors ${
        task.isCompleted
          ? "bg-[color:var(--muted)] border-[color:var(--border)]"
          : "bg-[color:var(--background)] border-[color:var(--border)]"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggleComplete(task._id, task.isCompleted)}
          className="mt-1 accent-[color:var(--accent)] w-5 h-5"
        />
        <div className="flex-1">
          <h4
            className={`font-semibold text-lg ${
              task.isCompleted
                ? "line-through text-[color:var(--muted-foreground)]"
                : "text-[color:var(--foreground)]"
            }`}
          >
            {task.title}
          </h4>
          {task.description && (
            <p
              className={`text-sm mt-1 ${
                task.isCompleted
                  ? "line-through text-[color:var(--muted-foreground)]"
                  : "text-[color:var(--secondary-foreground)]"
              }`}
            >
              {task.description}
            </p>
          )}
          <p className="text-xs text-[color:var(--muted-foreground)] mt-2">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-lg border-[color:var(--border)] text-[color:var(--primary)] font-semibold"
            onClick={() => onEdit(task)}
            disabled={task.isCompleted}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="rounded-lg bg-[color:var(--destructive)] text-[color:var(--accent-foreground)] font-semibold"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TasksList;
