import withAuth from "@/utils/AuthWrapper";

function TaskManager() {
  return <div>TaskManager</div>;
}

const AuthenticatedTaskManager = withAuth(TaskManager);
export default AuthenticatedTaskManager;
