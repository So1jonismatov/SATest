// src/api/real/types.ts

// =================================================================================================
// --- Request Body Types ---
// =================================================================================================

export interface StudentRegisterData {
  email: string;
  password: string;
  full_name: string;
  role?: "student";
}

export interface StudentLoginData {
  email: string;
  password: string;
}

export interface TeacherRegisterData {
  email: string;
  password: string;
  full_name: string;
  role?: "teacher";
}

export interface TeacherLoginData {
  email: string;
  password: string;
}

// =================================================================================================
// --- User & Auth Types ---
// =================================================================================================

export interface User {
  id: string;
  name: string;
  email: string;
  role: "teacher" | "student";
}

export interface AuthResponse {
  user: User;
  token: string;
}

// =================================================================================================
// --- Test Types ---
// =================================================================================================

export interface Question {
  id: string;
  text: string;
  type: "multiple_choice";
  options: {
    key: string;
    text: string;
  }[];
  correctAnswer: string;
}

export interface Test {
  testId: string;
  title: string;
  subject: string;
  questions: Question[];
}

export interface TestWithAccess {
  testId: string;
  nomi: string; // name
  subject: string;
  questionCount: number;
  isPremium: boolean;
  hasAccess: boolean;
  jami_urinishlar: number; // total attempts
  average: number;
}

export interface PaginatedTests {
  page: number;
  totalPages: number;
  totalTests: number;
  tests: TestWithAccess[];
}

export interface TestSubmission {
  score: number;
}

export interface UserAccess {
  userId: string;
  testId: string;
}

export interface UserWithAccessList {
  id: string;
  full_name: string;
  email: string;
  access_list: string[]; // array of testId
}

export interface PaginatedUsers {
  users: UserWithAccessList[];
  total: number;
  page: number;
}
