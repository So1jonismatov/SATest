import { createBrowserRouter } from "react-router-dom";
import HomePageLayout from "@/layout/HomePageLayout";
import StudentPortalLayout from "@/layout/StudentPortalLayout";
import ParentPortalLayout from "@/layout/ParentPortalLayout";
import TeacherPortalLayout from "@/layout/TeacherPageLayout";
import AdminPortalLayout from "@/layout/AdminPortalLayout";
import ProtectedRoute from "./ProtectedRoute";
import {
  AdminDashboard,
  AdminUserManagement,
  HomePage,
  LoginPage,
  NotFound,
  ParentDashboard,
  ParentChildManagement,
  ParentReports,
  RegisterPage,
  StudentDashboard,
  StudentTesting,
  TestPlayerPage,
  TestResultPage,
  TeacherPortal,
  TeacherTestManagement,
  UnauthorizedPage,
} from "@/pages";

const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <HomePageLayout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },

  // Student Portal
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <StudentPortalLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "tests", element: <StudentTesting /> },
    ],
  },

  // Fullscreen Student Routes (no sidebar)
  {
    path: "/student/test/:testId",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <TestPlayerPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student/result/:testId",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <TestResultPage />
      </ProtectedRoute>
    ),
  },

  // Parent Portal
  {
    path: "/parent",
    element: (
      <ProtectedRoute allowedRoles={["parent"]}>
        <ParentPortalLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <ParentDashboard /> },
      { path: "children", element: <ParentChildManagement /> },
      { path: "results", element: <ParentReports /> },
    ],
  },

  // Teacher Portal
  {
    path: "/teacher",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <TeacherPortalLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <TeacherPortal /> },
      { path: "tests", element: <TeacherTestManagement /> },
    ],
  },

  // Admin Portal
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminPortalLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <AdminUserManagement /> },
    ],
  },

  // Catch-all route
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
