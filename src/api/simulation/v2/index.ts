// src/api/simulation/v2/index.ts

import { db } from "./db";
import {
  type User,
  type Teacher,
  type Student,
  type Parent,
  type Test,
  type TestAnswer,
} from "@/types";

// Simulate API latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ================================================================================================
// In-memory test→student assignment map (per-student explicit assignments)
// ================================================================================================
const assignments = new Map<string, Set<string>>(); // testId -> Set<studentId>

// =================================================================================================
// --- Auth API ---
// =================================================================================================

// src/api/simulation/v2/auth.ts

export const authAPI = {
  login: (
    identifier: string,
    password: string,
    nameSurname?: string,
    className?: string,
  ): { user: User; token: string } | null => {
    let user: User | undefined;

    if (nameSurname && className) {
      // 🔹 Student Login (name + class + password)
      user = db.users.find(
        (u) =>
          u.role === "student" &&
          u.name === nameSurname &&
          (u as Student).class === className &&
          u.password === password,
      );
    } else {
      // 🔹 Admin / Teacher / Parent Login (phone/email + password)
      const normalizedIdentifier = identifier.replace(/\s/g, "");
      user = db.users.find(
        (u) =>
          (u.phone === normalizedIdentifier || u.email === identifier) &&
          u.password === password,
      );
    }

    if (!user) return null;

    const token = `fake-jwt-token-${user.id}`;
    localStorage.setItem("auth", JSON.stringify({ user, token }));

    return { user, token };
  },

  logout: () => {
    localStorage.removeItem("auth");
  },

  getCurrentUser: (): { user: User; token: string } | null => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  },
};

// =================================================================================================
// --- Admin API ---
// =================================================================================================

const adminAPI = {
  async getUsers(): Promise<User[]> {
    await delay(500);
    return db.users;
  },

  async createUser(userData: Omit<User, "id">): Promise<User> {
    await delay(500);
    if (db.users.some((u) => u.email === userData.email)) {
      throw new Error("User with this email already exists");
    }

    let newUser: User;
    const baseUser = {
      id: `${userData.role}-${Date.now()}`,
      ...userData,
    };

    switch (userData.role) {
      case "student":
        newUser = {
          ...baseUser,
          role: "student",
          teacherIds: [],
          class: (userData as any).class || "",
          parentId: null,
        };
        break;
      case "parent":
        newUser = {
          ...baseUser,
          role: "parent",
          childrenIds: [],
        };
        break;
      case "teacher":
        newUser = {
          ...baseUser,
          role: "teacher",
          studentIds: [],
        };
        break;
      case "admin":
        newUser = {
          ...baseUser,
          role: "admin",
        };
        break;
      default:
        throw new Error("Invalid user role");
    }

    db.users.push(newUser);
    return newUser;
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    await delay(500);
    const userIndex = db.users.findIndex((u) => u.id === userId);
    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const existingUser = db.users[userIndex];

    // Prevent role changes for simplicity in this simulation
    if (updates.role && updates.role !== existingUser.role) {
      delete updates.role;
    }

    db.users[userIndex] = { ...existingUser, ...updates } as User;
    return db.users[userIndex];
  },

  async deleteUser(userId: string): Promise<void> {
    await delay(500);
    const index = db.users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error("User not found");
    }
    db.users.splice(index, 1);
  },

  async assignTeacherToStudent(
    teacherId: string,
    studentId: string,
  ): Promise<void> {
    await delay(500);
    const teacher = db.users.find(
      (u) => u.id === teacherId && u.role === "teacher",
    ) as Teacher | undefined;
    const student = db.users.find(
      (u) => u.id === studentId && u.role === "student",
    ) as Student | undefined;

    if (!teacher || !student) {
      throw new Error("Teacher or student not found");
    }

    if (!teacher.studentIds.includes(studentId)) {
      teacher.studentIds.push(studentId);
    }
    if (!student.teacherIds.includes(teacherId)) {
      student.teacherIds.push(teacherId);
    }
  },

  async assignParentToStudent(
    parentId: string,
    studentId: string,
  ): Promise<void> {
    await delay(500);
    const parent = db.users.find(
      (u) => u.id === parentId && u.role === "parent",
    ) as Parent | undefined;
    const student = db.users.find(
      (u) => u.id === studentId && u.role === "student",
    ) as Student | undefined;

    if (!parent || !student) {
      throw new Error("Parent or student not found");
    }

    if (!parent.childrenIds.includes(studentId)) {
      parent.childrenIds.push(studentId);
    }
    student.parentId = parentId;
  },
};

// =================================================================================================
// --- Teacher API ---
// =================================================================================================

const teacherAPI = {
  async getTests(teacherId: string): Promise<Test[]> {
    await delay(500);
    return db.tests.filter((t) => t.teacherId === teacherId);
  },

  async getTest(testId: string): Promise<Test | undefined> {
    await delay(300);
    return db.tests.find((t) => t.id === testId);
  },

  async createTest(testData: Omit<Test, "id">): Promise<Test> {
    await delay(500);
    const newTest: Test = {
      id: `test-${Date.now()}`,
      ...testData,
    };
    db.tests.push(newTest);
    return newTest;
  },

  async updateTest(testId: string, updates: Partial<Test>): Promise<Test> {
    await delay(500);
    const testIndex = db.tests.findIndex((t) => t.id === testId);
    if (testIndex === -1) {
      throw new Error("Test not found");
    }
    db.tests[testIndex] = { ...db.tests[testIndex], ...updates };
    return db.tests[testIndex];
  },

  async deleteTest(testId: string): Promise<void> {
    await delay(500);
    const index = db.tests.findIndex((t) => t.id === testId);
    if (index === -1) {
      throw new Error("Test not found");
    }
    db.tests.splice(index, 1);
    assignments.delete(testId); // cleanup any assignments
  },

  async assignTestToStudent(testId: string, studentId: string): Promise<void> {
    await delay(300);
    const test = db.tests.find((t) => t.id === testId);
    const student = db.users.find(
      (u) => u.id === studentId && u.role === "student",
    ) as Student | undefined;

    if (!test) throw new Error("Test not found");
    if (!student) throw new Error("Student not found");

    if (!assignments.has(testId)) assignments.set(testId, new Set());
    assignments.get(testId)!.add(studentId);
  },

  async getAssignedStudents(testId: string): Promise<Student[]> {
    await delay(300);
    const set = assignments.get(testId);
    if (!set || set.size === 0) return [];
    const ids = Array.from(set);
    return db.users.filter(
      (u): u is Student => u.role === "student" && ids.includes(u.id),
    );
  },

  async getTestResults(testId: string): Promise<TestAnswer[]> {
    await delay(500);
    return db.testAnswers.filter((ta) => ta.testId === testId);
  },
};

// =================================================================================================
// --- Student API ---
// =================================================================================================

const studentAPI = {
  async getAssignedTests(studentId: string): Promise<Test[]> {
    await delay(500);
    const student = db.users.find(
      (u) => u.id === studentId && u.role === "student",
    ) as Student | undefined;
    if (!student) {
      throw new Error("Student not found");
    }

    // 1) Explicit per-student assignments (preferred)
    const explicitlyAssigned = db.tests.filter((t) => {
      const set = assignments.get(t.id);
      return set?.has(studentId);
    });

    if (explicitlyAssigned.length > 0) {
      return explicitlyAssigned;
    }

    // 2) Fallback: all tests from this student's teachers
    return db.tests.filter((test) =>
      (student.teacherIds || []).includes(test.teacherId),
    );
  },

  async getTest(testId: string): Promise<Test | undefined> {
    await delay(300);
    return db.tests.find((t) => t.id === testId);
  },

  async submitTest(
    submission: Omit<
      TestAnswer,
      "id" | "submittedAt" | "score" | "correctAnswers" | "totalQuestions"
    >,
  ): Promise<TestAnswer> {
    await delay(1000);

    const test = await teacherAPI.getTest(submission.testId);
    if (!test) {
      throw new Error("Test not found");
    }

    // --- Robust scoring: supports both index-based and id-based schemas ---
    let correctAnswers = 0;

    for (const answer of submission.answers) {
      const question = test.questions.find((q) => q.id === answer.questionId);
      if (!question) continue;

      // If your schema uses indexes (recommended & used in your UI)
      const hasIndex =
        "correctAnswerIndex" in question && "answeredIndex" in answer;

      if (hasIndex) {
        if (
          (question as any).correctAnswerIndex === (answer as any).answeredIndex
        ) {
          correctAnswers++;
        }
        continue;
      }

      // If your schema uses IDs
      const hasId = "correctAnswerId" in question && "answeredId" in answer;

      if (hasId) {
        if ((question as any).correctAnswerId === (answer as any).answeredId) {
          correctAnswers++;
        }
      }
    }

    const score = Math.round((correctAnswers / test.questions.length) * 100);

    const newTestAnswer: TestAnswer = {
      id: `ta-${Date.now()}`,
      ...submission,
      submittedAt: new Date().toISOString(),
      score,
      correctAnswers,
      totalQuestions: test.questions.length,
    };

    db.testAnswers.push(newTestAnswer);
    return newTestAnswer;
  },
};

// =================================================================================================
// --- Parent API ---
// =================================================================================================

const parentAPI = {
  async getChildren(parentId: string): Promise<Student[]> {
    await delay(500);
    const parent = db.users.find(
      (u) => u.id === parentId && u.role === "parent",
    ) as Parent | undefined;
    if (!parent) {
      throw new Error("Parent not found");
    }
    return db.users.filter(
      (u): u is Student =>
        u.role === "student" && parent.childrenIds.includes(u.id),
    );
  },

  async getChildTestResults(studentId: string): Promise<TestAnswer[]> {
    await delay(500);
    return db.testAnswers.filter((ta) => ta.studentId === studentId);
  },
};

export const api = {
  auth: authAPI,
  admin: adminAPI,
  teacher: teacherAPI,
  student: studentAPI,
  parent: parentAPI,
};
