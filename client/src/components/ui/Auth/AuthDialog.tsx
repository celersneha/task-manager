import { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Button } from "../button";

const AuthDialog = ({ onClose }: { onClose: () => void }) => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="fixed inset-0 flex items-center justify-center min-h-screen min-w-full backdrop-blur-lg bg-opacity-30 z-50">
      <div className="bg-white rounded shadow-lg p-6 min-w-[320px] relative">
        <button className="absolute right-2 top-2 text-xl" onClick={onClose}>
          ×
        </button>
        {mode === "signin" ? (
          <>
            <SignIn onSuccess={onClose} />
            <div className="mt-4 text-center">
              Don't have an account?{" "}
              <Button variant="ghost" onClick={() => setMode("signup")}>
                Sign Up
              </Button>
            </div>
          </>
        ) : (
          <>
            <SignUp onSuccess={onClose} />
            <div className="mt-4 text-center">
              Already have an account?{" "}
              <button
                className="text-blue-600"
                onClick={() => setMode("signin")}
              >
                Sign In
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthDialog;
