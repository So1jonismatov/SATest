import { type User } from "@/types";

const getRedirectPath = (user: User): string => {
  switch (user.role) {
    case "teacher":
      return "/admin/dashboard";
    case "student":
      return "/";
    default:
      return "/";
  }
};

export default getRedirectPath;
