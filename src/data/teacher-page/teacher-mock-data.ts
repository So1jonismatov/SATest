import type { Student, TeacherTest, TestResult } from "@/types";

// ----------------------
// Students
// ----------------------
export const mockStudents: Student[] = [
  {
    id: "student-1",
    name: "Alice Johnson",
    email: "alice.johnson@school.edu",
    grade: "10th Grade",
    class: "10-A",
    role: "student",
    phone: "111-111-1111",
    parentId: "parent-1",
    teacherIds: ["teacher-1"],
    enrolledTests: ["teacher-test-1"],
  },
  {
    id: "student-2",
    name: "Bob Smith",
    email: "bob.smith@school.edu",
    grade: "10th Grade",
    class: "10-A",
    role: "student",
    phone: "222-222-2222",
    parentId: "parent-2",
    teacherIds: ["teacher-1"],
    enrolledTests: ["teacher-test-1", "teacher-test-2"],
  },
  {
    id: "student-3",
    name: "Charlie Brown",
    email: "charlie.brown@school.edu",
    grade: "10th Grade",
    class: "10-B",
    role: "student",
    phone: "333-333-3333",
    parentId: "parent-3",
    teacherIds: ["teacher-2"],
    enrolledTests: ["teacher-test-2", "teacher-test-3"],
  },
  {
    id: "student-4",
    name: "Diana Prince",
    email: "diana.prince@school.edu",
    grade: "9th Grade",
    class: "9-A",
    role: "student",
    phone: "444-444-4444",
    parentId: "parent-4",
    teacherIds: ["teacher-2"],
    enrolledTests: ["teacher-test-2"],
  },
  {
    id: "student-5",
    name: "Emma Wilson",
    email: "emma.wilson@school.edu",
    grade: "10th Grade",
    class: "10-A",
    role: "student",
    phone: "555-555-5555",
    parentId: "parent-5",
    teacherIds: ["teacher-1"],
    enrolledTests: ["teacher-test-1", "teacher-test-3"],
  },
];

// ----------------------
// Teacher Tests
// ----------------------
export const mockTeacherTests: TeacherTest[] = [
  {
    id: "teacher-test-1",
    teacherId: "teacher-1",
    title: "Algebra Fundamentals Quiz",
    subject: "Mathematics",
    description: "Basic algebra concepts and problem solving techniques",
    durationInMinutes: 30,
    questionCount: 5,
    assignedStudents: ["student-1", "student-2", "student-5"],
    status: "Published",
    createdAt: "2024-12-20T10:00:00Z",
    updatedAt: "2024-12-20T10:00:00Z",
    dueDate: "2024-12-31T23:59:59Z",
    questions: [
      {
        id: "tq-1",
        text: "What is 2x + 5 = 15?",
        type: "multiple-choice",
        answers: [
          { id: "0", text: "x = 3" },
          { id: "1", text: "x = 5" },
          { id: "2", text: "x = 7" },
          { id: "3", text: "x = 10" },
        ],
        correctAnswerId: "1",
        points: 10,
      },
      {
        id: "tq-2",
        text: "Solve for y: 3y - 9 = 0",
        type: "multiple-choice",
        answers: [
          { id: "0", text: "y = 2" },
          { id: "1", text: "y = 3" },
          { id: "2", text: "y = 4" },
          { id: "3", text: "y = 6" },
        ],
        correctAnswerId: "1",
        points: 10,
      },
      {
        id: "tq-3",
        text: "What is the slope of the line y = 2x + 3?",
        type: "short-answer",
        answers: [],
        correctAnswerId: "ans-1",
        points: 15,
      },
      {
        id: "tq-4",
        text: "Is the equation y = mx + b the slope-intercept form?",
        type: "true-false",
        answers: [
          { id: "0", text: "True" },
          { id: "1", text: "False" },
        ],
        correctAnswerId: "0",
        points: 5,
      },
      {
        id: "tq-5",
        text: "Factor: x² - 5x + 6",
        type: "multiple-choice",
        answers: [
          { id: "0", text: "(x-2)(x-3)" },
          { id: "1", text: "(x-1)(x-6)" },
          { id: "2", text: "(x+2)(x+3)" },
          { id: "3", text: "(x-4)(x-1)" },
        ],
        correctAnswerId: "0",
        points: 20,
      },
    ],
  },
  {
    id: "teacher-test-2",
    teacherId: "teacher-1",
    title: "World Geography Test",
    subject: "Geography",
    description: "Countries, capitals, and major geographical features",
    durationInMinutes: 25,
    questionCount: 4,
    assignedStudents: ["student-3", "student-4"],
    status: "Published",
    createdAt: "2024-12-18T14:00:00Z",
    updatedAt: "2024-12-19T09:00:00Z",
    dueDate: "2025-01-05T23:59:59Z",
    questions: [
      {
        id: "tq-6",
        text: "What is the capital of Australia?",
        type: "multiple-choice",
        answers: [
          { id: "0", text: "Sydney" },
          { id: "1", text: "Melbourne" },
          { id: "2", text: "Canberra" },
          { id: "3", text: "Perth" },
        ],
        correctAnswerId: "2",
        points: 15,
      },
      {
        id: "tq-7",
        text: "Which river is the longest in the world?",
        type: "short-answer",
        answers: [],
        correctAnswerId: "ans-2",
        points: 20,
      },
      {
        id: "tq-8",
        text: "Mount Everest is located in Nepal.",
        type: "true-false",
        answers: [
          { id: "0", text: "True" },
          { id: "1", text: "False" },
        ],
        correctAnswerId: "0",
        points: 10,
      },
      {
        id: "tq-9",
        text: "Which continent has the most countries?",
        type: "multiple-choice",
        answers: [
          { id: "0", text: "Asia" },
          { id: "1", text: "Africa" },
          { id: "2", text: "Europe" },
          { id: "3", text: "South America" },
        ],
        correctAnswerId: "1",
        points: 15,
      },
    ],
  },
  {
    id: "teacher-test-3",
    teacherId: "teacher-1",
    title: "Biology Cell Structure",
    subject: "Biology",
    description: "Understanding cell components and their functions",
    durationInMinutes: 40,
    questionCount: 3,
    assignedStudents: ["student-1", "student-3", "student-5"],
    status: "Draft",
    createdAt: "2024-12-22T11:00:00Z",
    updatedAt: "2024-12-22T16:30:00Z",
    questions: [
      {
        id: "tq-10",
        text: "What is the powerhouse of the cell?",
        type: "multiple-choice",
        answers: [
          { id: "0", text: "Nucleus" },
          { id: "1", text: "Mitochondria" },
          { id: "2", text: "Ribosome" },
          { id: "3", text: "Endoplasmic Reticulum" },
        ],
        correctAnswerId: "1",
        points: 20,
      },
      {
        id: "tq-11",
        text: "Describe the function of the cell membrane.",
        type: "short-answer",
        answers: [],
        correctAnswerId: "ans-3",
        points: 25,
      },
      {
        id: "tq-12",
        text: "Plant cells have cell walls.",
        type: "true-false",
        answers: [
          { id: "0", text: "True" },
          { id: "1", text: "False" },
        ],
        correctAnswerId: "0",
        points: 15,
      },
    ],
  },
];

// ----------------------
// Test Results
// ----------------------
export const mockTestResults: TestResult[] = [
  {
    id: "result-1",
    testId: "teacher-test-1",
    studentId: "student-1",
    score: 45,
    percentage: 75,
    correctAnswers: 3,
    totalQuestions: 5,
    timeSpent: 1200,
    completedAt: "2024-12-23T15:30:00Z",
    answers: [
      { questionId: "tq-1", answer: "1", isCorrect: true, timeSpent: 120 },
      { questionId: "tq-2", answer: "1", isCorrect: true, timeSpent: 180 },
      { questionId: "tq-3", answer: "2", isCorrect: true, timeSpent: 300 },
      { questionId: "tq-4", answer: "1", isCorrect: false, timeSpent: 90 },
      { questionId: "tq-5", answer: "2", isCorrect: false, timeSpent: 510 },
    ],
  },
  {
    id: "result-2",
    testId: "teacher-test-1",
    studentId: "student-2",
    score: 50,
    percentage: 83,
    correctAnswers: 4,
    totalQuestions: 5,
    timeSpent: 1500,
    completedAt: "2024-12-23T14:45:00Z",
    answers: [
      { questionId: "tq-1", answer: "1", isCorrect: true, timeSpent: 150 },
      { questionId: "tq-2", answer: "1", isCorrect: true, timeSpent: 200 },
      { questionId: "tq-3", answer: "2", isCorrect: true, timeSpent: 400 },
      { questionId: "tq-4", answer: "0", isCorrect: true, timeSpent: 100 },
      { questionId: "tq-5", answer: "1", isCorrect: false, timeSpent: 650 },
    ],
  },
];

// ----------------------
// Teacher Stats
// ----------------------
export const mockTeacherStats = {
  totalTests: 8,
  activeTests: 3,
  totalStudents: 25,
  completedTests: 15,
  averageScore: 78.5,
  recentActivity: [
    {
      id: "activity-1",
      type: "test_completed" as const,
      message: "Alice Johnson completed Algebra Fundamentals Quiz",
      timestamp: "2024-12-23T15:30:00Z",
      studentName: "Alice Johnson",
      testTitle: "Algebra Fundamentals Quiz",
    },
    {
      id: "activity-2",
      type: "test_completed" as const,
      message: "Bob Smith completed Algebra Fundamentals Quiz",
      timestamp: "2024-12-23T14:45:00Z",
      studentName: "Bob Smith",
      testTitle: "Algebra Fundamentals Quiz",
    },
    {
      id: "activity-3",
      type: "test_created" as const,
      message: "Created new test: Biology Cell Structure",
      timestamp: "2024-12-22T11:00:00Z",
      testTitle: "Biology Cell Structure",
    },
  ],
};

export type Answer = {
  id: string;
  text: string;
};
