// src/api/simulation/v2/index.ts

import type {
  PaginatedTests,
  UserAccess,
  UserWithAccessList,
  PaginatedUsers,
} from "../../real/types";

// Simulate API latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory database for simulation
const inMemoryDb = {
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "test@example.com",
      role: "student",
      phone: "test@example.com",
      status: "Active",
      password: "password123", // Hashed in real implementation
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "admin@example.com",
      role: "teacher",
      phone: "admin@example.com",
      status: "Active",
      password: "admin123", // Hashed in real implementation
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "student",
      phone: "bob@example.com",
      status: "Active",
      password: "password123",
    },
  ],
  tests: [
    {
      testId: "1",
      nomi: "SAT Math Practice Test 1",
      subject: "mathematics",
      questionCount: 58,
      isPremium: false,
      hasAccess: true,
      jami_urinishlar: 120,
      average: 750.5,
    },
    {
      testId: "2",
      nomi: "SAT Reading Practice Test 1",
      subject: "reading",
      questionCount: 52,
      isPremium: false,
      hasAccess: true,
      jami_urinishlar: 95,
      average: 680.0,
    },
    {
      testId: "3",
      nomi: "Advanced SAT Math Test",
      subject: "mathematics",
      questionCount: 58,
      isPremium: true,
      hasAccess: false,
      jami_urinishlar: 15,
      average: 720.0,
    },
  ],
  userAccess: [
    {
      userId: "1",
      testId: "1",
    },
    {
      userId: "2",
      testId: "1",
    },
    {
      userId: "2",
      testId: "2",
    },
  ],
  questions: [
    {
      id: "q1",
      testId: "1",
      text: "What is the value of x in the equation 2x + 3 = 7?",
      type: "multiple_choice",
      options: [
        { key: "A", text: "1" },
        { key: "B", text: "2" },
        { key: "C", text: "3" },
        { key: "D", text: "4" },
      ],
      correctAnswer: "B",
    },
    {
      id: "q2",
      testId: "1",
      text: "Which of the following is the main idea of the passage?",
      type: "multiple_choice",
      options: [
        { key: "A", text: "Option A" },
        { key: "B", text: "Option B" },
        { key: "C", text: "Option C" },
        { key: "D", text: "Option D" },
      ],
      correctAnswer: "A",
    },
  ],
};

// =================================================================================================
// --- Auth API ---
// =================================================================================================

export const authAPI = {
  async register(userData: {
    email: string;
    password: string;
    full_name: string;
    role?: "student";
  }): Promise<{ user: any; token: string }> {
    await delay(500);

    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.full_name,
      email: userData.email,
      role: userData.role || "student",
      phone: userData.email,
      status: "Active",
      password: userData.password,
    };

    inMemoryDb.users.push(newUser);

    const token = `mock-jwt-token-${newUser.id}`;
    localStorage.setItem("auth", JSON.stringify({ user: newUser, token }));

    return { user: newUser, token };
  },

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<{ user: any; token: string }> {
    await delay(500);

    const user = inMemoryDb.users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password,
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const token = `mock-jwt-token-${user.id}`;
    localStorage.setItem("auth", JSON.stringify({ user, token }));

    return { user, token };
  },

  logout: () => {
    localStorage.removeItem("auth");
  },

  getCurrentUser: (): { user: any; token: string } | null => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : null;
  },
};

// =================================================================================================
// --- Student API ---
// =================================================================================================

const studentAPI = {
  async getTests(params?: {
    page?: number;
    limit?: number;
    subject?: string;
  }): Promise<PaginatedTests> {
    await delay(500);

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const subject = params?.subject;

    let filteredTests = inMemoryDb.tests;

    if (subject) {
      filteredTests = filteredTests.filter((test) => test.subject === subject);
    }

    const totalTests = filteredTests.length;
    const totalPages = Math.ceil(totalTests / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedTests = filteredTests.slice(startIndex, endIndex);

    return {
      page,
      totalPages,
      totalTests,
      tests: paginatedTests,
    };
  },

  async getTest(testId: string): Promise<any> {
    await delay(300);

    const test = inMemoryDb.tests.find((t) => t.testId === testId);

    if (!test) {
      throw new Error("Test not found");
    }

    const currentUser = authAPI.getCurrentUser();
    const hasAccess = inMemoryDb.userAccess.some(
      (ua) => ua.userId === currentUser?.user.id && ua.testId === testId,
    );

    // Return the questions for this test
    const questions = inMemoryDb.questions.filter((q) => q.testId === testId);

    return {
      ...test,
      title: test.nomi,
      questions:
        questions.length > 0 ? questions : inMemoryDb.questions.slice(0, 3), // fallback to sample questions
      hasAccess: hasAccess || !test.isPremium, // Non-premium tests are always accessible
    };
  },

  async submitTest(
    testId: string,
    submission: { score: number },
  ): Promise<any> {
    await delay(500);

    // In a real app, this would update test statistics
    console.log(`Test ${testId} submitted with score:`, submission.score);

    return { success: true, message: "Test submitted successfully" };
  },
};

// =================================================================================================
// --- Teacher API ---
// =================================================================================================

const teacherAPI = {
  async createTest(testData: any): Promise<any> {
    await delay(500);

    const newTest = {
      testId: `test-${Date.now()}`,
      nomi: testData.title || "New SAT Test",
      subject: testData.subject || "mathematics",
      questionCount: testData.questions?.length || 0,
      isPremium: testData.isPremium || false,
      hasAccess: true,
      jami_urinishlar: 0,
      average: 0,
    };

    inMemoryDb.tests.push(newTest);

    return newTest;
  },

  async deleteTest(testId: string): Promise<any> {
    await delay(300);

    const index = inMemoryDb.tests.findIndex((test) => test.testId === testId);

    if (index !== -1) {
      inMemoryDb.tests.splice(index, 1);

      // Also remove questions associated with this test
      inMemoryDb.questions = inMemoryDb.questions.filter(
        (q) => !q.id.startsWith(testId),
      );
    }

    return { success: true, message: "Test deleted successfully" };
  },

  async updateTest(testId: string, testData: any): Promise<any> {
    await delay(300);

    const testIndex = inMemoryDb.tests.findIndex(
      (test) => test.testId === testId,
    );

    if (testIndex !== -1) {
      inMemoryDb.tests[testIndex] = {
        ...inMemoryDb.tests[testIndex],
        ...testData,
      };
    }

    return { success: true, message: "Test updated successfully" };
  },

  async getTest(testId: string): Promise<any> {
    await delay(300);
    const test = inMemoryDb.tests.find((t) => t.testId === testId);
    if (!test) {
      throw new Error("Test not found");
    }
    const questions = inMemoryDb.questions.filter((q) => q.testId === testId);
    return { ...test, title: test.nomi, questions };
  },

  async grantAccess(accessData: UserAccess): Promise<any> {
    await delay(300);

    // Check if access already exists
    const existingAccess = inMemoryDb.userAccess.find(
      (ua) =>
        ua.userId === accessData.userId && ua.testId === accessData.testId,
    );

    if (!existingAccess) {
      inMemoryDb.userAccess.push(accessData);
    }

    return { success: true, message: "Access granted successfully" };
  },

  async revokeAccess(accessData: UserAccess): Promise<any> {
    await delay(300);

    const index = inMemoryDb.userAccess.findIndex(
      (ua) =>
        ua.userId === accessData.userId && ua.testId === accessData.testId,
    );

    if (index !== -1) {
      inMemoryDb.userAccess.splice(index, 1);
    }

    return { success: true, message: "Access revoked successfully" };
  },

  async getUser(userId: string): Promise<UserWithAccessList> {
    await delay(300);

    const user = inMemoryDb.users.find((u) => u.id === userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Get user's access list
    const accessList = inMemoryDb.userAccess
      .filter((ua) => ua.userId === userId)
      .map((ua) => ua.testId);

    return {
      id: user.id,
      full_name: user.name,
      email: user.email,
      access_list: accessList,
    };
  },

  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedUsers> {
    await delay(500);

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const search = params?.search;

    let filteredUsers = inMemoryDb.users.filter((u) => u.role === "student");

    if (search) {
      filteredUsers = filteredUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedUsers = filteredUsers
      .slice(startIndex, endIndex)
      .map((user) => {
        const accessList = inMemoryDb.userAccess
          .filter((ua) => ua.userId === user.id)
          .map((ua) => ua.testId);

        return {
          id: user.id,
          full_name: user.name,
          email: user.email,
          access_list: accessList,
        };
      });

    return {
      users: paginatedUsers,
      total,
      page,
      totalPages,
    };
  },

  async deleteUser(userId: string): Promise<any> {
    await delay(300);

    const userIndex = inMemoryDb.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      inMemoryDb.users.splice(userIndex, 1);
    }

    // Also remove user's access records
    inMemoryDb.userAccess = inMemoryDb.userAccess.filter(ua => ua.userId !== userId);

    return { success: true, message: "User deleted successfully" };
  },

  async addUser(userData: any): Promise<any> {
    await delay(300);

    const newUser = {
      id: `user-${Date.now()}`,
      name: userData.full_name,
      email: userData.email,
      role: userData.role || "student",
      phone: userData.email,
      status: "Active",
      password: userData.password,
    };

    inMemoryDb.users.push(newUser);

    return {
      id: newUser.id,
      full_name: newUser.name,
      email: newUser.email,
      access_list: [],
    };
  },
};

export const api = {
  auth: authAPI,
  student: studentAPI,
  teacher: teacherAPI,
};
