import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthDialog from "../ui/Auth/AuthDialog";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <nav className="flex p-4 border-b border-gray-200 justify-between">
      <div>
        <NavLink to="/" className="font-bold text-lg">
          TaskManager
        </NavLink>
      </div>
      <div className="flex items-center">
        <NavLink to="/" className="mr-4">
          Home
        </NavLink>
        <NavLink to="/projects" className="mr-4">
          Projects
        </NavLink>
        <NavLink to="/about" className="mr-4">
          About
        </NavLink>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="mr-4"
        >
          Github
        </a>
        {user ? (
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Sign Out
          </button>
        ) : (
          <>
            <button
              onClick={() => setAuthOpen(true)}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              Sign In / Sign Up
            </button>
            {authOpen && <AuthDialog onClose={() => setAuthOpen(false)} />}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
