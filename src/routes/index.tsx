import { createBrowserRouter } from "react-router-dom";
import HomePageLayout from "@/layout/HomePageLayout";
import TeacherPortalLayout from "@/layout/TeacherPageLayout";
import ProtectedRoute from "./ProtectedRoute";
import {
  LoginPage,
  NotFound,
  RegisterPage,
  StudentDashboard,
  StudentProfile,
  StudentSettings,
  TestPlayerPage,
  TestResultPage,
  TeacherPortal,
  TeacherProfile,
  TeacherSettings,
  TeacherTestManagement,
  UnauthorizedPage,
} from "@/pages";

const router = createBrowserRouter([
  // Public routes // Make StudentDashboard the home page
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/unauthorized", element: <UnauthorizedPage /> },

  // Student Portal - using main layout
  {
    path: "/",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <HomePageLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "", element: <StudentDashboard /> }],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <HomePageLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "", element: <StudentProfile /> }],
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <HomePageLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "", element: <StudentSettings /> }],
  },

  // Student Test Routes (with main layout)
  {
    path: "/test/:testId",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <HomePageLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "", element: <TestPlayerPage /> }],
  },
  {
    path: "/result/:testId",
    element: (
      <ProtectedRoute allowedRoles={["student"]}>
        <HomePageLayout />
      </ProtectedRoute>
    ),
    children: [{ path: "", element: <TestResultPage /> }],
  },

  // Teacher/Admin Portal (combined)
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["teacher"]}>
        <TeacherPortalLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <TeacherPortal /> },
      { path: "tests", element: <TeacherTestManagement /> },
      { path: "students", element: <TeacherTestManagement /> }, // For now, redirect to test management
      { path: "profile", element: <TeacherProfile /> },
      { path: "settings", element: <TeacherSettings /> },
    ],
  },

  // Catch-all route
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
