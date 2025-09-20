import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthDialog from "../ui/Auth/AuthDialog";
import { Button } from "../ui/button";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[color:var(--card)]/80 border-b border-[color:var(--border)] shadow-sm sticky top-0 z-50 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <NavLink
          to="/"
          className="font-extrabold text-2xl tracking-tight text-[color:var(--accent)] hover:text-[color:var(--primary)] transition-colors"
        >
          TaskManager
        </NavLink>

        {user && (
          <NavLink
            to="/task-manager"
            className="ml-4 text-[color:var(--foreground)] hover:text-[color:var(--accent)] font-medium transition-colors"
          >
            Task Manager
          </NavLink>
        )}
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <Button
            onClick={handleSignOut}
            className="bg-[color:var(--accent)] hover:bg-[color:var(--destructive)] text-[color:var(--accent-foreground)] px-6 py-2 rounded-xl font-semibold shadow transition-colors"
          >
            Sign Out
          </Button>
        ) : (
          <>
            <Button
              onClick={() => setAuthOpen(true)}
              className="bg-[color:var(--primary)] hover:bg-[color:var(--accent)] text-[color:var(--primary-foreground)] px-6 py-2 rounded-xl font-semibold shadow transition-colors"
            >
              Sign In
            </Button>
            {authOpen && <AuthDialog onClose={() => setAuthOpen(false)} />}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
