// Public pages
export { default as HomePage } from "./public/HomePage";
export { default as LoginPage } from "./public/LoginPage";
export { default as RegisterPage } from "./public/RegisterPage";
export { default as NotFound } from "./public/NotFound";
export { default as UnauthorizedPage } from "./public/UnauthorizedPage";

// Protected pages - Admin
export { default as AdminDashboard } from "./protected/Admin/AdminDashboard";
export { default as AdminUserManagement } from "./protected/Admin/AdminUserManagement";
export { default as AdminSettings } from "./protected/Admin/AdminSettings";

// Protected pages - Teacher
export { default as TeacherPortal } from "./protected/Teacher/TeacherPortal";
export { default as TeacherProfile } from "./protected/Teacher/TeacherProfile";
export { default as TeacherTestManagement } from "./protected/Teacher/TeacherTestManagement";
export { default as TeacherSettings } from "./protected/Teacher/TeacherSettings";

// Protected pages - Student
export { default as StudentDashboard } from "./protected/Student/StudentDashboard";
export { default as StudentProfile } from "./protected/Student/StudentProfile";
export { default as StudentSettings } from "./protected/Student/StudentSettings";
export { default as StudentTesting } from "./protected/Student/StudentTesting";
export { default as TestPlayerPage } from "./protected/Student/TestPlayerPage";
export { default as TestResultPage } from "./protected/Student/TestResultPage";

// Protected pages - Parent
export { default as ParentDashboard } from "./protected/Parent/ParentDashboard";
export { default as ParentChildManagement } from "./protected/Parent/ParentChildManagement";
export { default as ParentReports } from "./protected/Parent/ParentReports";
export { default as ParentSettings } from "./protected/Parent/ParentSettings";
