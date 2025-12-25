// Mock data for students (you can expand this)
export const completedHomeworks = 18;
export const pendingHomeworks = 3;
export const averageTestScore = 87;

// New function for student overview
export const getStudentOverview = () => {
  return {
    currentGPA: 3.6,
    completedHomeworks,
    pendingHomeworks,
    averageTestScore,
    totalTests: 12,
    completedTests: 10,
    upcomingDeadlines: 2,
    currentCourses: 6,
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
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-green-600 bg-green-50";
    case "pending":
      return "text-yellow-600 bg-yellow-50";
    case "graded":
      return "text-green-600 bg-green-50";
    case "submitted":
      return "text-blue-600 bg-blue-50";
    case "overdue":
      return "text-red-600 bg-red-50";
    case "not started":
      return "text-gray-600 bg-gray-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};
