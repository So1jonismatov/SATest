// src/types/index.ts

// ========= USER TYPES =========
export type UserRole = "admin" | "teacher" | "student" | "parent";
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

export interface Admin extends BaseUser {
  role: "admin";
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
  class: string;
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

export interface Child extends Student {
  role: "student";
  studentId?: string;
  grade?: string;
  parentId: string | null;
  teacherIds: string[];
  class: string;
  enrollmentDate?: string;
  dateOfBirth?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Parent extends BaseUser {
  role: "parent";
  childrenIds: string[];
  address?: string;
  occupation?: string;
}

export type User = Admin | Teacher | Student | Parent;

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

// ========= ADMIN & CLASS TYPES =========
export interface Class {
  id: string;
  name: string;
  grade: string;
  teacherId: string;
  studentIds: string[];
  subject: string;
  schedule: {
    days: string[];
    time: string;
    room: string;
  };
}

export interface AdminActivity {
  id: string;
  type: "user_created" | "user_updated" | "user_deleted" | "assignment_changed";
  message: string;
  timestamp: string;
  userId?: string;
  userName?: string;
}

export interface AdminStats {
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalClasses: number;
  activeUsers: number;
  newRegistrations: number;
  recentActivity: AdminActivity[];
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

// ========= PARENT-SPECIFIC TYPES =========
export interface Course {
  id: string;
  name: string;
  subject: string;
  teacher: Teacher;
  schedule: {
    days: string[];
    time: string;
    room: string;
  };
  description: string;
  credits: number;
}

export interface Enrollment {
  id: string;
  childId: string;
  courseId: string;
  enrollmentDate: string;
  status: "Active" | "Dropped" | "Completed";
  currentGrade?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  threadId?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface MessageThread {
  id: string;
  participants: {
    id: string;
    name: string;
    role: "parent" | "teacher";
  }[];
  subject: string;
  lastMessage: Message;
  messageCount: number;
  isArchived: boolean;
}

export interface RecentTest {
  testId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedOn: string;
}

export interface ChildPerformance {
  childId: string;
  overallGrade: string;
  gpa: number;
  totalHomeworks: number;
  completedHomeworks: number;
  pendingHomeworks: number;
  averageTestScore: number;
  recentTests: RecentTest[];
  recentHomeworks: Homework[];
  attendance: {
    totalDays: number;
    presentDays: number;
    absentDays: number;
    tardyDays: number;
  };
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: "teacher" | "admin";
  targetAudience: "all" | "parents" | "students" | "grade-specific";
  grade?: string;
  createdAt: string;
  isImportant: boolean;
  attachments?: {
    name: string;
    url: string;
  }[];
}

export interface SchoolEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "meeting" | "performance" | "holiday" | "exam" | "sports" | "other";
  isAllDay: boolean;
  targetAudience: "all" | "parents" | "students" | "grade-specific";
  grade?: string;
}

export interface ParentDashboardData {
  children: Student[];
  totalChildren: number;
  activeChildren: number;
  unreadMessages: number;
  upcomingEvents: SchoolEvent[];
  recentAnnouncements: Announcement[];
  childrenPerformance: ChildPerformance[];
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
