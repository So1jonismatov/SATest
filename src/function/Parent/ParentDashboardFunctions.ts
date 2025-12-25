/**
 * Helper functions for parent dashboard functionality
 */

import { api } from "@/api/real";
import type {
  Student as Child,
  ChildPerformance,
  Course,
  Teacher,
} from "@/types";

// Get all children for current parent
export const getParentChildren = async (): Promise<Child[]> => {
  try {
    const children = await api.parent.getChildren();
    // Here you might need to map the API response to the Child[] type
    return children as Child[];
  } catch (error) {
    console.error("Failed to fetch parent children:", error);
    return []; // Return empty array on error
  }
};

// Get performance data for a specific child
export const getChildPerformance = (
  childId: string,
): ChildPerformance | undefined => {
  // TODO: Refactor to use real API.
  // This will likely involve fetching test results from endpoints like
  // api.parent.getStudentTests(phoneNumber) and constructing the performance object.
  console.warn(
    `getChildPerformance for ${childId} is not implemented with real API yet.`,
  );
  return undefined;
};

// Get courses for a specific child
export const getChildCourses = (childId: string): Course[] => {
  // TODO: Refactor to use real API. The endpoint for fetching a child's courses needs to be identified.
  console.warn(
    `getChildCourses for ${childId} is not implemented with real API yet.`,
  );
  return [];
};

// Get teachers for a specific child
export const getChildTeachers = (childId: string): Teacher[] => {
  // TODO: Refactor to use real API. The endpoint for fetching a child's teachers needs to be identified.
  console.warn(
    `getChildTeachers for ${childId} is not implemented with real API yet.`,
  );
  return [];
};

// Get unread messages count
export const getUnreadMessagesCount = (): number => {
  // TODO: Refactor to use real API. The endpoint for fetching messages needs to be identified.
  console.warn(`getUnreadMessagesCount is not implemented with real API yet.`);
  return 0;
};

// Calculate overall family performance
export const getFamilyPerformanceOverview = () => {
  // TODO: Refactor to use real API. This will involve fetching data for all children and aggregating it.
  console.warn(
    `getFamilyPerformanceOverview is not implemented with real API yet.`,
  );
  return {
    totalChildren: 0,
    activeChildren: 0,
    totalHomeworks: 0,
    completedHomeworks: 0,
    homeworkCompletionRate: 0,
    averageGPA: 0,
    averageTestScore: 0,
  };
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Format time for display
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get grade color for styling
export const getGradeColor = (grade: string): string => {
  const gradeValue = grade.charAt(0);
  switch (gradeValue) {
    case "A":
      return "text-green-600 bg-green-50";
    case "B":
      return "text-blue-600 bg-blue-50";
    case "C":
      return "text-yellow-600 bg-yellow-50";
    case "D":
      return "text-orange-600 bg-orange-50";
    case "F":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

// Get status color for styling
export const getStatusColor = (status: string | undefined): string => {
  switch (status?.toLowerCase()) {
    case "active":
      return "text-green-600 bg-green-50";
    case "pending":
      return "text-yellow-600 bg-yellow-50";
    case "completed":
      return "text-blue-600 bg-blue-50";
    case "graded":
      return "text-green-600 bg-green-50";
    case "submitted":
      return "text-blue-600 bg-blue-50";
    case "overdue":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};
