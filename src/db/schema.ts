// Database schema definition for the test management system
import { z } from 'zod';

// User schema
export const UserSchema = z.object({
  id: z.string(), // UUID or auto-incrementing integer
  email: z.string().email(),
  full_name: z.string(),
  password: z.string(), // Should be hashed
  role: z.enum(['student', 'admin', 'teacher']), // Using 'admin' and 'teacher' as synonyms
});

export type User = z.infer<typeof UserSchema>;

// Test schema
export const TestSchema = z.object({
  id: z.number(), // Auto-incrementing integer
  nomi: z.string(), // Test name like "SAT matematika 1-modul"
  subject: z.string(), // "mathematics", "reading", "english", etc.
  savollar_soni: z.number(), // Number of questions
  is_premium: z.boolean(), // false = free, true = requires admin access
  jami_urinishlar: z.number().default(0), // Total attempts counter
  average: z.number().default(0), // Average score of all users
});

export type Test = z.infer<typeof TestSchema>;

// Question schema
export const QuestionSchema = z.object({
  id: z.number(), // Auto-incrementing integer
  test_id: z.number(), // Foreign key to Tests.id
  content: z.string(), // Question text
  type: z.string(), // Question type (e.g., "multiple_choice")
  options: z.array(z.object({
    key: z.string(), // Option key like "A", "B", "C", "D"
    text: z.string(), // Option text
  })), // JSON array of options
  correct_answer: z.object({
    key: z.string(), // Correct option key like "A"
  }), // JSON object with correct answer
});

export type Question = z.infer<typeof QuestionSchema>;

// User Access schema (for admin-granted premium access)
export const UserAccessSchema = z.object({
  id: z.number(), // Auto-incrementing integer
  user_id: z.string(), // Foreign key to Users.id
  test_id: z.number(), // Foreign key to Tests.id
});

export type UserAccess = z.infer<typeof UserAccessSchema>;

// Test Results schema
export const TestResultSchema = z.object({
  id: z.number(), // Auto-incrementing integer
  user_id: z.string(), // Foreign key to Users.id
  test_id: z.number(), // Foreign key to Tests.id
  score: z.number(), // Score from frontend
  completed_at: z.date(), // Date when test was completed
});

export type TestResult = z.infer<typeof TestResultSchema>;

// API Response types
export const TestWithAccessSchema = TestSchema.extend({
  hasAccess: z.boolean(), // Whether current user has access to this test
});

export type TestWithAccess = z.infer<typeof TestWithAccessSchema>;

export const UserWithAccessListSchema = UserSchema.extend({
  access_list: z.array(z.number()), // Array of test IDs the user has access to
});

export type UserWithAccessList = z.infer<typeof UserWithAccessListSchema>;

// Request/Response schemas for API endpoints

// Auth endpoints
export const RegisterRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string(),
  role: z.enum(['student', 'admin', 'teacher']).default('student'),
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const CreateUserRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string(),
  role: z.enum(['student', 'admin', 'teacher']).default('student'),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  token: z.string(), // JWT token
  user: z.object({
    id: z.string(),
    role: z.enum(['student', 'admin', 'teacher']),
  }),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Test endpoints
export const GetTestsResponseSchema = z.object({
  page: z.number(),
  totalPages: z.number(),
  totalTests: z.number(),
  tests: z.array(TestWithAccessSchema),
});

export type GetTestsResponse = z.infer<typeof GetTestsResponseSchema>;

export const GetTestByIdResponseSchema = z.object({
  testId: z.number(),
  title: z.string(),
  questions: z.array(QuestionSchema.omit({ test_id: true, correct_answer: true })), // Don't send correct answers to frontend
});

export type GetTestByIdResponse = z.infer<typeof GetTestByIdResponseSchema>;

export const SubmitTestRequestSchema = z.object({
  score: z.number(),
});

export type SubmitTestRequest = z.infer<typeof SubmitTestRequestSchema>;

// Admin endpoints
export const CreateTestRequestSchema = z.object({
  nomi: z.string(),
  subject: z.string(),
  is_premium: z.boolean(),
  questions: z.array(z.object({
    text: z.string(),
    options: z.array(z.object({
      key: z.string(),
      text: z.string(),
    })),
    correctAnswer: z.string(),
  })),
});

export type CreateTestRequest = z.infer<typeof CreateTestRequestSchema>;

export const GrantAccessRequestSchema = z.object({
  userId: z.string(),
  testId: z.number(),
});

export type GrantAccessRequest = z.infer<typeof GrantAccessRequestSchema>;

export const GetUserDetailsResponseSchema = UserWithAccessListSchema.omit({ password: true });

export type GetUserDetailsResponse = z.infer<typeof GetUserDetailsResponseSchema>;

export const GetUsersResponseSchema = z.object({
  users: z.array(UserSchema.omit({ password: true })),
  total: z.number(),
  page: z.number(),
});

export type GetUsersResponse = z.infer<typeof GetUsersResponseSchema>;