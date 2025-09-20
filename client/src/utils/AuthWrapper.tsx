import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

// HOC version
function withAuth<T extends React.PropsWithChildren<unknown>>(
  Component: React.ComponentType<T>
) {
  return function AuthWrapped(props: T) {
    const { user } = useAuth();

    const navigate = useNavigate();
    const [showUnauthorized, setShowUnauthorized] = useState(false);

    useEffect(() => {
      if (!user) {
        const timer = setTimeout(() => setShowUnauthorized(true), 200);
        return () => clearTimeout(timer);
      } else {
        setShowUnauthorized(false);
      }
    }, [user]);

    if (!user && showUnauthorized) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Unauthorized Access
          </h2>
          <p className="mb-6 text-gray-600">
            You are not authorized to view this page.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Return to Home Page
          </button>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}

export default withAuth;
