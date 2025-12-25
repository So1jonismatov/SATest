// import {
//   mockAdminStudents,
//   mockAdminTeachers,
//   mockAdminParents,
//   mockAdminStats,
//   mockClasses,
//   mockTeacherAssignments,
// } from "@/data/admin-page/admin-mock-data";

import type {
  Student as AdminStudent,
  Teacher as AdminTeacher,
  Parent as AdminParent,
  AdminStats,
  Class,
  TeacherAssignment,
} from "@/types";

export const getAdminStats = (): AdminStats => {
  // return mockAdminStats;
  return {
    totalStudents: 0,
    totalTeachers: 0,
    totalParents: 0,
    totalClasses: 0,
    activeUsers: 0,
    newRegistrations: 0,
    recentActivity: [],
  };
};

export const getAllStudents = (): AdminStudent[] => {
  // return mockAdminStudents;
  return [];
};

export const getAllTeachers = (): AdminTeacher[] => {
  // return mockAdminTeachers;
  return [];
};

export const getAllParents = (): AdminParent[] => {
  // return mockAdminParents;
  return [];
};

export const getAllClasses = (): Class[] => {
  // return mockClasses;
  return [];
};

export const getTeacherAssignments = (): TeacherAssignment[] => {
  // return mockTeacherAssignments;
  return [];
};

// @ts-ignore
export const getStudentById = (id: string): AdminStudent | undefined => {
  // return mockAdminStudents.find((student) => student.id === id);
  return undefined;
};

// @ts-ignore
export const getTeacherById = (id: string): AdminTeacher | undefined => {
  // return mockAdminTeachers.find((teacher) => teacher.id === id);
  return undefined;
};

// @ts-ignore
export const getParentById = (id: string): AdminParent | undefined => {
  // return mockAdminParents.find((parent) => parent.id === id);
  return undefined;
};

// @ts-ignore
export const getStudentsByTeacher = (teacherId: string): AdminStudent[] => {
  // const teacher = getTeacherById(teacherId);
  // if (!teacher) return [];
  // return mockAdminStudents.filter((student) =>
  //   teacher.assignedStudents.includes(student.id),
  // );
  return [];
};

// @ts-ignore
export const getTeachersByStudent = (studentId: string): AdminTeacher[] => {
  // const student = getStudentById(studentId);
  // if (!student) return [];
  // return mockAdminTeachers.filter((teacher) =>
  //   student.assignedTeachers.includes(teacher.id),
  // );
  return [];
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-700 border-green-200";
    case "Inactive":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Suspended":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export const getRoleColor = (role: string): string => {
  switch (role) {
    case "student":
      return "bg-blue-100 text-blue-700";
    case "teacher":
      return "bg-purple-100 text-purple-700";
    case "parent":
      return "bg-green-100 text-green-700";
    case "admin":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const getUserStats = () => {
  const students = getAllStudents();
  const teachers = getAllTeachers();
  const parents = getAllParents();

  const activeStudents = students.filter((s) => s.status === "Active").length;
  const activeTeachers = teachers.filter((t) => t.status === "Active").length;
  const activeParents = parents.filter((p) => p.status === "Active").length;

  return {
    students: {
      total: students.length,
      active: activeStudents,
      inactive: students.length - activeStudents,
    },
    teachers: {
      total: teachers.length,
      active: activeTeachers,
      inactive: teachers.length - activeTeachers,
    },
    parents: {
      total: parents.length,
      active: activeParents,
      inactive: parents.length - activeParents,
    },
  };
};

export const searchUsers = (
  query: string,
  type?: "student" | "teacher" | "parent",
) => {
  const searchTerm = query.toLowerCase();
  let results: any[] = [];

  if (!type || type === "student") {
    const students = getAllStudents().filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm) ||
        student.email?.toLowerCase().includes(searchTerm) ||
        student.studentId?.toLowerCase().includes(searchTerm),
    );
    results.push(...students);
  }

  if (!type || type === "teacher") {
    const teachers = getAllTeachers().filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm) ||
        teacher.email?.toLowerCase().includes(searchTerm) ||
        teacher.department?.toLowerCase().includes(searchTerm),
    );
    results.push(...teachers);
  }

  if (!type || type === "parent") {
    const parents = getAllParents().filter(
      (parent) =>
        parent.name.toLowerCase().includes(searchTerm) ||
        parent.email?.toLowerCase().includes(searchTerm),
    );
    results.push(...parents);
  }

  return results;
};
