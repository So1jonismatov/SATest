// src/function/Teacher/user-mapper.ts
import { type User as ApiUser } from "@/api/real/types";
import { type UserWithAccessList } from "@/api/real/types";

export const mapApiUserToUserWithAccessList = (apiUser: ApiUser): UserWithAccessList => {
  return {
    id: apiUser.id,
    full_name: apiUser.full_name,
    email: apiUser.email,
    access_list: [], // New users have no access initially
  };
};
