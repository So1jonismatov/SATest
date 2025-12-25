// src/api/real/types.ts

// =================================================================================================
// --- Request Body Types ---
// =================================================================================================

export interface StudentRegisterData {
  first_name: string;
  last_name: string;
  student_phone: string;
  parent_phone: string;
  class_id: number;
  password: string;
}

export interface StudentLoginData {
  phone_number: string;
  password: string;
}

export interface ParentRegisterData {
  first_name: string;
  last_name: string;
  parent_phone: string;
  password: string;
}

export interface ParentLoginData {
  parent_phone: string;
  password: string;
}

export interface TeacherRegisterData {
  phone_number: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface TeacherLoginData {
  phone_number: string;
  password: string;
}

export interface AdminRegisterData {
  first_name: string;
  last_name: string;
  phone_number: string;
  password: string;
}

export interface AdminLoginData {
  phone_number: string;
  password: string;
}

// =================================================================================================
// --- User & Auth Types ---
// =================================================================================================

interface BaseUser {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
}

export interface StudentUser extends BaseUser {
  role: "student";
  class_id: number;
}

export interface ParentUser extends BaseUser {
  role: "parent";
}

export interface TeacherUser extends BaseUser {
  role: "teacher";
}

export interface AdminUser extends BaseUser {
  role: "admin";
}

export type User = StudentUser | ParentUser | TeacherUser | AdminUser;

export interface AuthResponse {
  user: User;
  token: string;
}
