import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="text-xl font-bold text-text"
        >
          Task Manager
        </Link>

        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted">
              {user.name}
            </span>

            <button
              onClick={logout}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text transition hover:bg-background"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;