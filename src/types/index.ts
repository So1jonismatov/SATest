// src/types/index.ts

// ========= USER TYPES =========
export type UserRole = "teacher" | "student";
export type UserStatus = "Active" | "Inactive" | "Suspended" | "Pending";

export interface BaseUser {
  id: string;
  name: string;
  email?: string;
  phone: string;
  role: UserRole;
  password?: string;
  status?: UserStatus;
  createdAt?: string;
  lastLogin?: string;
  avatar?: string;
}

export interface Teacher extends BaseUser {
  role: "teacher";
  studentIds: string[];
  department?: string;
  subjects?: string[];
  qualifications?: string;
  experience?: string;
  officeLocation?: string;
  officeHours?: string;
  salary?: number;
  hireDate?: string;
  contactHours?: string;
  subject?: string;
}

export interface Student extends BaseUser {
  role: "student";
  studentId?: string;
  grade?: string;
  parentId: string | null;
  teacherIds: string[];
  enrollmentDate?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  enrolledTests?: string[]; // ✅ added to match mock data
}

export type User = Teacher | Student;

// ========= AUTH TYPES =========
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// ========= TEST & QUESTION TYPES =========
export type TestStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "Published"
  | "Draft"
  | "Archived";
export type QuestionType = "multiple-choice" | "true-false" | "short-answer";

export type Answer = {
  id: string;
  text: string;
};

export interface Question {
  id: string;
  text: string;
  answers: Answer[];
  correctAnswerId: string;
  imageUrl?: string;
  type?: QuestionType;
  options?: string[];
  correctAnswerIndex?: number;
  correctAnswer?: string;
  points?: number;
}

export interface Test {
  id: string;
  teacherId: string;
  title: string;
  questions: Question[];
  durationInMinutes?: number;
  status?: TestStatus;
  subject?: string;
  description?: string;
  questionCount?: number;
  assignedStudents?: string[];
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
}

export interface TestAnswer {
  id: string;
  testId: string;
  studentId: string;
  submittedAt: string;
  score: number;
  answers: { questionId: string; answeredId: string }[];
  correctAnswers: number;
  totalQuestions: number;
}

export interface StudentAnswer {
  questionId: string;
  answer: string | number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface TeacherTestResult {
  id: string;
  testId: string;
  studentId: string;
  studentName: string;
  score: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  completedAt: string;
  answers: StudentAnswer[];
}

// ========= HOMEWORK TYPES =========
export type HomeworkStatus = "Pending" | "Submitted" | "Graded" | "Overdue";
export type DisplayStatus = HomeworkStatus | TestStatus | UserStatus;

export interface Homework {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: HomeworkStatus;
  submittedFile?: {
    name: string;
    url: string;
  };
  grade?: string;
}

// ========= TEACHER TYPES =========
export interface TeacherActivity {
  id: string;
  type: "user_created" | "user_updated" | "user_deleted" | "assignment_changed";
  message: string;
  timestamp: string;
  userId?: string;
  userName?: string;
}

export interface TeacherStats {
  totalStudents: number;
  totalTeachers: number;
  activeUsers: number;
  newRegistrations: number;
  recentActivity: TeacherActivity[];
}

export interface TeacherAssignment {
  id: string;
  testId: string;
  studentId: string;
  assignedAt: string;
  dueDate: string;
  status: "Assigned" | "In Progress" | "Completed" | "Overdue";
  startedAt?: string;
  completedAt?: string;
  score?: number;
  answers?: StudentAnswer[];
}

export interface TeacherStats {
  totalTests: number;
  activeTests: number;
  totalStudents: number;
  completedTests: number;
  averageScore: number;
  recentActivity: RecentActivity[];
}

export interface RecentActivity {
  id: string;
  type: "test_completed" | "test_created" | "student_assigned";
  message: string;
  timestamp: string;
  studentName?: string;
  testTitle?: string;
}

// ========= THEME TYPES =========
export type Theme = "dark" | "light" | "system";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export interface ThemeProviderState {
  theme: Theme | string;
  setTheme: (theme: Theme) => void;
}

// ========= CHOOSE ROLE TYPES =========
export interface ChooseOneProps {
  maxWidth?: string;
}

export interface CardSpotlightComponentProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientClasses: string;
}

export interface Feature {
  icon: React.ReactNode;
  text: string;
  bgClass: string;
}
// ========= TEACHER TEST TYPES =========
export interface TeacherTest {
  id: string;
  teacherId: string;
  title: string;
  subject: string;
  description: string;
  durationInMinutes: number;
  questionCount: number;
  assignedStudents: string[];
  status: "Published" | "Draft" | "Archived";
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  questions: Question[];
}

// ========= TEST RESULT TYPES =========
export interface TestResult {
  id: string;
  testId: string;
  studentId: string;
  studentName?: string; // ✅ optional
  score: number;
  percentage: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt: string;
  answers: StudentAnswer[];
}
