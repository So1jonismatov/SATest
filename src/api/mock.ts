// src/api/mock.ts - Mock API for dummy tests and data

import type {
  TestWithAccess,
  PaginatedTests,
  TestSubmission,
  UserAccess,
  UserWithAccessList,
  PaginatedUsers
} from "./real/types";
import type { Test, Question } from "@/types";

// Simulate API latency
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// In-memory database for mock tests
const mockDatabase = {
  users: [
    {
      id: "user-1",
      name: "Student One",
      email: "student1@example.com",
      role: "student" as const,
    },
    {
      id: "user-2",
      name: "Student Two",
      email: "student2@example.com",
      role: "student" as const,
    },
    {
      id: "user-3",
      name: "Teacher One",
      email: "teacher1@example.com",
      role: "teacher" as const,
    }
  ],
  tests: [
    {
      testId: "test-1",
      nomi: "SAT Math Practice Test 1",
      subject: "Mathematics",
      questionCount: 58,
      isPremium: false,
      hasAccess: true,
      jami_urinishlar: 120,
      average: 750.5
    },
    {
      testId: "test-2",
      nomi: "SAT Reading Practice Test 1",
      subject: "Reading",
      questionCount: 52,
      isPremium: false,
      hasAccess: true,
      jami_urinishlar: 95,
      average: 680.0
    },
    {
      testId: "test-3",
      nomi: "SAT Writing Practice Test 1",
      subject: "Writing",
      questionCount: 44,
      isPremium: false,
      hasAccess: true,
      jami_urinishlar: 80,
      average: 720.0
    },
    {
      testId: "test-4",
      nomi: "Advanced SAT Math Test",
      subject: "Mathematics",
      questionCount: 58,
      isPremium: true,
      hasAccess: true,
      jami_urinishlar: 15,
      average: 720.0
    },
    {
      testId: "test-5",
      nomi: "Advanced SAT Reading Test",
      subject: "Reading",
      questionCount: 52,
      isPremium: true,
      hasAccess: true,
      jami_urinishlar: 10,
      average: 690.0
    }
  ],
  questions: [
    {
      id: "q1-1",
      text: "If 3x + 7 = 22, what is the value of x?",
      type: "multiple-choice" as const,
      answers: [
        { id: "A", text: "3" },
        { id: "B", text: "5" },
        { id: "C", text: "7" },
        { id: "D", text: "9" }
      ],
      correctAnswerId: "B"
    },
    {
      id: "q1-2",
      text: "Which of the following is equivalent to 2(x + 3) - 4?",
      type: "multiple-choice" as const,
      answers: [
        { id: "A", text: "2x - 1" },
        { id: "B", text: "2x + 2" },
        { id: "C", text: "2x + 6" },
        { id: "D", text: "x + 2" }
      ],
      correctAnswerId: "B"
    },
    {
      id: "q1-3",
      text: "In the equation 5x - 3 = 2x + 9, what is the value of x?",
      type: "multiple-choice" as const,
      answers: [
        { id: "A", text: "2" },
        { id: "B", text: "3" },
        { id: "C", text: "4" },
        { id: "D", text: "5" }
      ],
      correctAnswerId: "C"
    },
    {
      id: "q2-1",
      text: "According to the passage, what is the main idea?",
      type: "multiple-choice" as const,
      answers: [
        { id: "A", text: "The importance of reading" },
        { id: "B", text: "The history of literature" },
        { id: "C", text: "The benefits of education" },
        { id: "D", text: "The role of imagination" }
      ],
      correctAnswerId: "A"
    },
    {
      id: "q2-2",
      text: "Which word best describes the tone of the passage?",
      type: "multiple-choice" as const,
      answers: [
        { id: "A", text: "Sarcastic" },
        { id: "B", text: "Formal" },
        { id: "C", text: "Playful" },
        { id: "D", text: "Critical" }
      ],
      correctAnswerId: "B"
    },
    {
      id: "q3-1",
      text: "What is the primary purpose of the underlined section?",
      type: "multiple-choice" as const,
      answers: [
        { id: "A", text: "To provide an example" },
        { id: "B", text: "To make a comparison" },
        { id: "C", text: "To introduce a concept" },
        { id: "D", text: "To summarize information" }
      ],
      correctAnswerId: "C"
    }
  ],
  userAccess: [
    { userId: "user-1", testId: "test-1" },
    { userId: "user-1", testId: "test-2" },
    { userId: "user-2", testId: "test-1" },
  ],
  testSubmissions: [] as any[]
};

export const mockApi = {
  auth: {
    async register(data: any) {
      await delay(500);
      const newUser = {
        user: {
          id: `user-${Date.now()}`,
          name: data.full_name,
          email: data.email,
          role: data.role || "student"
        },
        token: `mock-token-${Date.now()}`
      };
      mockDatabase.users.push(newUser.user);
      return newUser;
    },
    
    async login(data: any) {
      await delay(500);
      const user = mockDatabase.users.find(u => u.email === data.email);
      if (!user) {
        throw new Error("Invalid credentials");
      }
      return {
        user,
        token: `mock-token-${Date.now()}`
      };
    },
    
    logout: () => {
      // Mock logout
    },
    
    getCurrentUser: () => {
      // Mock current user
      return null;
    }
  },
  
  student: {
    async getTests(params?: { page?: number; limit?: number; subject?: string }): Promise<PaginatedTests> {
      await delay(800); // Simulate network delay

      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const subject = params?.subject;

      let filteredTests = [...mockDatabase.tests];

      if (subject) {
        filteredTests = filteredTests.filter(test =>
          test.subject.toLowerCase().includes(subject.toLowerCase())
        );
      }

      const totalTests = filteredTests.length;
      const totalPages = Math.ceil(totalTests / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, totalTests);

      const paginatedTests = filteredTests.slice(startIndex, endIndex);

      // Convert to the expected TestWithAccess format
      const convertedTests = paginatedTests.map(test => ({
        testId: test.testId,
        nomi: test.nomi,
        subject: test.subject,
        questionCount: test.questionCount,
        isPremium: test.isPremium,
        hasAccess: test.hasAccess,
        jami_urinishlar: test.jami_urinishlar,
        average: test.average
      }));

      return {
        page,
        totalPages,
        totalTests,
        tests: convertedTests
      };
    },

    async getTest(testId: string): Promise<Test> {
      await delay(800); // Simulate network delay

      const testInfo = mockDatabase.tests.find(t => t.testId === testId);
      if (!testInfo) {
        throw new Error("Test not found");
      }

      // Get questions for this test
      const questions = mockDatabase.questions.filter(q => q.id.startsWith(testId.replace('test-', 'q')));

      // Return in the format expected by the main Test type
      return {
        id: testInfo.testId,
        teacherId: "teacher-1", // default teacher
        title: testInfo.nomi,
        subject: testInfo.subject,
        questions: questions.length > 0 ? questions : mockDatabase.questions.slice(0, 5).map(q => ({
          id: q.id,
          text: q.text,
          answers: q.options?.map(opt => ({ id: opt.key, text: opt.text })) || [],
          correctAnswerId: q.correctAnswer
        })),
        durationInMinutes: 60,
        status: "Published",
        questionCount: questions.length > 0 ? questions.length : 5,
        assignedStudents: []
      };
    },
    
    async submitTest(testId: string, submission: TestSubmission) {
      await delay(500);
      
      const newSubmission = {
        id: `sub-${Date.now()}`,
        testId,
        ...submission
      };
      
      mockDatabase.testSubmissions.push(newSubmission);
      
      return { success: true, message: "Test submitted successfully", score: submission.score };
    }
  },
  
  teacher: {
    async createTest(testData: any) {
      await delay(500);
      
      const newTest = {
        testId: `test-${Date.now()}`,
        nomi: testData.title || "New Test",
        subject: testData.subject || "General",
        questionCount: testData.questions?.length || 0,
        isPremium: testData.isPremium || false,
        hasAccess: true,
        jami_urinishlar: 0,
        average: 0
      };
      
      mockDatabase.tests.push(newTest);
      
      return newTest;
    },
    
    async grantAccess(accessData: UserAccess) {
      await delay(300);
      
      const existing = mockDatabase.userAccess.find(
        ua => ua.userId === accessData.userId && ua.testId === accessData.testId
      );
      
      if (!existing) {
        mockDatabase.userAccess.push(accessData);
      }
      
      return { success: true };
    },
    
    async revokeAccess(accessData: UserAccess) {
      await delay(300);
      
      const index = mockDatabase.userAccess.findIndex(
        ua => ua.userId === accessData.userId && ua.testId === accessData.testId
      );
      
      if (index !== -1) {
        mockDatabase.userAccess.splice(index, 1);
      }
      
      return { success: true };
    },
    
    async getUser(userId: string): Promise<UserWithAccessList> {
      await delay(300);
      
      const user = mockDatabase.users.find(u => u.id === userId);
      if (!user) {
        throw new Error("User not found");
      }
      
      const accessList = mockDatabase.userAccess
        .filter(ua => ua.userId === userId)
        .map(ua => ua.testId);
      
      return {
        id: user.id,
        full_name: user.name,
        email: user.email,
        access_list: accessList
      };
    },
    
    async getUsers(params?: { page?: number; limit?: number; search?: string }): Promise<PaginatedUsers> {
      await delay(500);
      
      const page = params?.page || 1;
      const limit = params?.limit || 10;
      const search = params?.search;
      
      let filteredUsers = [...mockDatabase.users].filter(u => u.role === "student");
      
      if (search) {
        filteredUsers = filteredUsers.filter(
          u => u.name.toLowerCase().includes(search.toLowerCase()) ||
               u.email.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      const total = filteredUsers.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = Math.min(startIndex + limit, total);
      
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex).map(user => {
        const accessList = mockDatabase.userAccess
          .filter(ua => ua.userId === user.id)
          .map(ua => ua.testId);
        
        return {
          id: user.id,
          full_name: user.name,
          email: user.email,
          access_list: accessList
        };
      });
      
      return {
        users: paginatedUsers,
        total,
        page
      };
    }
  }
};