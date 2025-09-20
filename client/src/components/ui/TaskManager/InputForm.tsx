import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { taskAPI } from "../../../api/taskApi";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

type FormData = z.infer<typeof schema>;

interface InputFormProps {
  onTaskAdded: () => void;
  editTask?: { _id: string; title: string; description?: string };
  onEditComplete?: () => void;
}

const InputForm = ({
  onTaskAdded,
  editTask,
  onEditComplete,
}: InputFormProps) => {
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: editTask?.title || "",
      description: editTask?.description || "",
    },
  });

  useEffect(() => {
    if (editTask && formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      form.reset({
        title: editTask.title,
        description: editTask.description || "",
      });
    }
  }, [editTask, form]);

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      if (editTask) {
        await taskAPI.updateTask(editTask._id, data);
        onEditComplete?.();
      } else {
        await taskAPI.createTask(data);
        form.reset();
      }
      onTaskAdded();
    } catch (err: unknown) {
      setError((err as any)?.response?.data?.message || "Failed to save task");
    }
  };

  return (
    <div
      ref={formRef}
      className="bg-[color:var(--card)] p-6 rounded-xl shadow-lg mb-6 border border-[color:var(--border)]"
    >
      <h2 className="text-2xl font-extrabold mb-4 text-[color:var(--accent)]">
        {editTask ? "Edit Task" : "Add New Task"}
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[color:var(--primary)] font-semibold">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-[color:var(--background)] border-[color:var(--border)] rounded-lg focus:ring-2 focus:ring-[color:var(--accent)]"
                    placeholder="Enter task title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[color:var(--primary)] font-semibold">
                  Description (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-[color:var(--background)] border-[color:var(--border)] rounded-lg focus:ring-2 focus:ring-[color:var(--accent)]"
                    placeholder="Enter task description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && (
            <div className="text-[color:var(--destructive)] text-sm">
              {error}
            </div>
          )}
          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-[color:var(--accent)] hover:bg-[color:var(--primary)] text-[color:var(--accent-foreground)] rounded-lg px-6 py-2 font-semibold shadow transition-colors"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? editTask
                  ? "Updating..."
                  : "Adding..."
                : editTask
                ? "Update Task"
                : "Add Task"}
            </Button>
            {editTask && (
              <Button
                type="button"
                variant="outline"
                className="rounded-lg border-[color:var(--border)] text-[color:var(--foreground)]"
                onClick={() => {
                  form.reset({
                    title: "",
                    description: "",
                  });
                  onEditComplete?.();
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InputForm;
