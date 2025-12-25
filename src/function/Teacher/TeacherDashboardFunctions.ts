import {
  mockStudents,
  mockTeacherTests,
  mockTestResults,
  mockTeacherStats,
} from "@/data/teacher-page/teacher-mock-data";
import type {
  Test as TeacherTest,
  Student,
  TeacherTestResult as TestResult,
  TeacherStats,
} from "@/types";

export const getTeacherStats = (): TeacherStats => {
  return mockTeacherStats;
};

export const getAllTests = (): TeacherTest[] => {
  return mockTeacherTests;
};

export const getTestById = (id: string): TeacherTest | undefined => {
  return mockTeacherTests.find((test) => test.id === id);
};

export const getAllStudents = (): Student[] => {
  return mockStudents;
};

export const getStudentById = (id: string): Student | undefined => {
  return mockStudents.find((student) => student.id === id);
};

export const getTestResults = (testId?: string): TestResult[] => {
  if (testId) {
    return mockTestResults
      .filter((result) => result.testId === testId)
      .map((r) => ({ ...r, studentName: r.studentName ?? "Unknown" }));
  }
  return mockTestResults.map((r) => ({
    ...r,
    studentName: r.studentName ?? "Unknown",
  }));
};

export const getStudentResults = (studentId: string): TestResult[] => {
  return mockTestResults
    .filter((result) => result.studentId === studentId)
    .map((r) => ({ ...r, studentName: r.studentName ?? "Unknown" }));
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-700 border-green-200";
    case "Draft":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Archived":
      return "bg-gray-100 text-gray-700 border-gray-200";
    case "Completed":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "In Progress":
      return "bg-orange-100 text-orange-700 border-orange-200";
    case "Assigned":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "Overdue":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const getGradeColor = (percentage: number): string => {
  if (percentage >= 90) return "bg-green-100 text-green-700 border-green-200";
  if (percentage >= 80) return "bg-blue-100 text-blue-700 border-blue-200";
  if (percentage >= 70)
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
  if (percentage >= 60)
    return "bg-orange-100 text-orange-700 border-orange-200";
  return "bg-red-100 text-red-700 border-red-200";
};

export const calculateTestStatistics = (testId: string) => {
  const results = getTestResults(testId);
  if (results.length === 0) {
    return {
      totalSubmissions: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: 0,
      passRate: 0,
    };
  }

  const scores = results.map((result) => result.percentage);
  const totalSubmissions = results.length;
  const averageScore =
    scores.reduce((sum, score) => sum + score, 0) / totalSubmissions;
  const highestScore = Math.max(...scores);
  const lowestScore = Math.min(...scores);
  const passRate =
    (scores.filter((score) => score >= 60).length / totalSubmissions) * 100;

  return {
    totalSubmissions,
    averageScore: Math.round(averageScore * 10) / 10,
    highestScore,
    lowestScore,
    passRate: Math.round(passRate),
  };
};
