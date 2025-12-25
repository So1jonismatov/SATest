import { StudentLoginForm } from "@/components/shared/Authenticaton/student-login-form";
import { GeneralLoginForm } from "@/components/shared/Authenticaton/general-login-form";

type Role = "student" | "teacher" | "admin" | "parent";

const getRole = (): Role => {
  const role = localStorage.getItem("chosenRole");
  if (
    role === "student" ||
    role === "teacher" ||
    role === "admin" ||
    role === "parent"
  ) {
    return role;
  }
  // Default to student if no role is set or role is invalid
  return "student";
};

const LoginPage = () => {
  const role = getRole();

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {role === "student" ? (
        <StudentLoginForm className="w-full max-w-sm" />
      ) : (
        <GeneralLoginForm className="w-full max-w-sm" role={role} />
      )}
    </div>
  );
};

export default LoginPage;
