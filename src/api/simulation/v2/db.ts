// src/api/simulation/v2/db.ts

import type { User, Test, TestAnswer } from "@/types";

interface Database {
  users: User[];
  tests: Test[];
  testAnswers: TestAnswer[];
}

// =================================================================================================
// --- THE SIMULATED DATABASE ---
// This is our single source of truth. All API functions will read from and write to this object.
// =================================================================================================

const users: User[] = [
  // --- Admins ---
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    password: "password123",
    phone: "+998991234567",
  },

  // --- Teachers ---
  {
    id: "teacher-1",
    name: "Teacher One",
    email: "teacher1@example.com",
    role: "teacher",
    password: "password123",
    studentIds: ["student-1", "student-2"],
    phone: "+998991234568",
  },
  {
    id: "teacher-2",
    name: "Teacher Two",
    email: "teacher2@example.com",
    role: "teacher",
    password: "password123",
    studentIds: ["student-3"],
    phone: "+998991234569",
  },

  // --- Parents ---
  {
    id: "parent-1",
    name: "Parent One",
    email: "parent1@example.com",
    role: "parent",
    password: "password123",
    childrenIds: ["student-1"],
    phone: "+998991234570",
  },
  {
    id: "parent-2",
    name: "Parent Two",
    email: "parent2@example.com",
    role: "parent",
    password: "password123",
    childrenIds: ["student-2", "student-3"],
    phone: "+998991234571",
  },

  // --- Students ---
  {
    id: "student-1",
    name: "Student One",
    email: "student1@example.com",
    role: "student",
    password: "password123",
    class: "10A",
    parentId: "parent-1",
    teacherIds: ["teacher-1"],
    phone: "+998901234567",
  },
  {
    id: "student-2",
    name: "Student Two",
    email: "student2@example.com",
    role: "student",
    password: "password123",
    class: "10A",
    parentId: "parent-2",
    teacherIds: ["teacher-1"],
    phone: "+998901234568",
  },
  {
    id: "student-3",
    name: "Student Three",
    email: "student3@example.com",
    role: "student",
    password: "password123",
    class: "11B",
    parentId: "parent-2",
    teacherIds: ["teacher-2"],
    phone: "+998901234569",
  },
];

const tests: Test[] = [
  {
    id: "test-1",
    teacherId: "teacher-1",
    title: "Algebra Basics",
    questions: [
      {
        id: "q-1",
        text: "What is 2 + 2?",
        answers: [
          { id: "a-1", text: "3" },
          { id: "a-2", text: "4" },
          { id: "a-3", text: "5" },
        ],
        correctAnswerId: "a-2",
        imageUrl: "https://picsum.photos/400/200",
      },
      {
        id: "q-2",
        text: "What is 5 * 5?",
        answers: [
          { id: "a-1", text: "25" },
          { id: "a-2", text: "30" },
          { id: "a-3", text: "35" },
        ],
        correctAnswerId: "a-1",
      },
    ],
  },
  {
    id: "test-2",
    teacherId: "teacher-2",
    title: "History 101",
    questions: [
      {
        id: "q-1",
        text: "Who was the first president of the United States?",
        answers: [
          { id: "a-1", text: "Abraham Lincoln" },
          { id: "a-2", text: "George Washington" },
          { id: "a-3", text: "Thomas Jefferson" },
        ],
        correctAnswerId: "a-2",
      },
    ],
  },
];

const testAnswers: TestAnswer[] = [];

export const db: Database = {
  users,
  tests,
  testAnswers,
};
