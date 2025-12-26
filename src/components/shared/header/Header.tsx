import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <Link to="/">
        <h1 className="text-2xl font-bold text-foreground">AnorTest</h1>
      </Link>

      <nav className="hidden md:flex items-center space-x-6">
        {isAuthenticated && user?.role === "student" && (
          <>
            <Link to="/" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link to="/profile" className="text-sm font-medium hover:underline">
              Profile
            </Link>
            <Link
              to="/settings"
              className="text-sm font-medium hover:underline"
            >
              Settings
            </Link>
          </>
        )}
        {isAuthenticated && user?.role === "teacher" && (
          <>
            <Link
              to="/admin/dashboard"
              className="text-sm font-medium hover:underline"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/tests"
              className="text-sm font-medium hover:underline"
            >
              Tests
            </Link>
            <Link
              to="/admin/profile"
              className="text-sm font-medium hover:underline"
            >
              Profile
            </Link>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Link to="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium hover:underline"
            >
              Register
            </Link>
          </>
        )}
      </nav>

      <div className="flex items-center space-x-4">
        {isAuthenticated && (
          <div className="hidden md:block text-sm">Welcome, {user?.name}</div>
        )}
        {isAuthenticated && (
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        )}
        <Link
          to="/admin/dashboard"
          className="hidden md:block p-2 text-sm"
          onClick={(e) => {
            e.preventDefault();
            localStorage.setItem("chosenRole", "admin");
            window.location.href = "/admin/dashboard";
          }}
        >
          Switch to Admin
        </Link>
        <ModeToggle />
      </div>
    </header>
  );
};
