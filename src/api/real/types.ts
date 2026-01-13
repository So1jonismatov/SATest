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



// =================================================================================================
// --- User & Auth Types ---
// =================================================================================================

export interface User {
  id: number;
  full_name: string | null;
  email: string;
  role: "teacher" | "student";
  created_at: string;
  updated_at: string;
  userAccesses: any[];
  userInfos: any[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

// =================================================================================================
// --- Test Types ---
// =================================================================================================

export interface Question {
  id: number;
  question: string;
  type: "multiple_choice";
  options: Record<string, string>; // e.g., { "A": "Option A", "B": "Option B" }
  correctAnswer: { answer: string };
  questionImage: any[]; // Or a more specific type for image data
}

export interface Test {
  id: number;
  nomi: string;
  subject: string;
  savollar_soni: number | null;
  is_premium: boolean;
  jami_urinishlar: number;
  average: number | null;
  created_at: string;
  updated_at: string;
  questions: Question[];
  userAccesses: any[]; // Consider a more specific type if available
  userInfos: any[]; // Consider a more specific type if available
}



export interface TestWithAccess {
  testId: number;
  nomi: string;
  subject: string;
  questionCount: number;
  is_premium: boolean;
  hasAccess: boolean;
  jami_urinishlar: number;
  average: number | null;
  questions?: Question[];
}

export interface UserAccess {
  id?: number; // Optional, as it's assigned by the backend on creation
  user_id: number;
  test_id: number;
  created_at?: string;
}


