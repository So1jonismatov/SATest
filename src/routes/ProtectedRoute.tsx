import { type ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useFullscreen } from "@/context/FullscreenContext";

type Role = "student" | "teacher";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const { enterFullscreen } = useFullscreen();

  // Restore fullscreen if user is student
  useEffect(() => {
    if (user?.role === "student") {
      const handler = () => {
        enterFullscreen();
        document.removeEventListener("click", handler);
      };
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    }
  }, [user, enterFullscreen]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // if (allowedRoles && allowedRoles.length > 0 && user) {
  //   const hasRequiredRole = allowedRoles.includes(user.role);
  //   if (!hasRequiredRole) {
  //     return <Navigate to="/unauthorized" replace />;
  //   }
  // }

  return <>{children}</>;
};

export default ProtectedRoute;
