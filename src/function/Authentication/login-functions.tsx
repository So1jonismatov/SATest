import { type User } from "@/types";

const getRedirectPath = (user: User): string => {
  switch (user.role) {
    case "admin":
      return "/admin/dashboard";
    case "teacher":
      return "/teacher/dashboard";
    case "student":
      return "/student/dashboard";
    case "parent":
      return "/parent/dashboard";
    default:
      return "/";
  }
};

export default getRedirectPath;
