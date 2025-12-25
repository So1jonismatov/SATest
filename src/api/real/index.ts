import { getCookie, eraseCookie } from "@/function/cookies";
import type {
  StudentRegisterData,
  StudentLoginData,
  ParentRegisterData,
  ParentLoginData,
  TeacherRegisterData,
  TeacherLoginData,
  AdminLoginData,
  AdminRegisterData,
  AuthResponse,
} from "./types";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = (): string | null => {
  return getCookie("authToken");
};

// Decode JWT payload
const parseJwt = (token: string): any => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

// -------------------- Generic helpers --------------------

async function get<T>(url: string): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${url}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API GET request failed");
  }

  return response.json();
}

async function post<T>(url: string, data: any): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API POST request failed");
  }

  return response.json();
}

async function del<T>(url: string): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${url}`, {
    method: "DELETE",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API DELETE request failed");
  }

  return response.json();
}

// -------------------- Auth APIs --------------------

const studentAuthAPI = {
  register: (data: StudentRegisterData) =>
    post<AuthResponse>("student/register", data),
  login: (data: StudentLoginData) =>
    post<any>("student/login", data).then((response) => {
      const authResponse: AuthResponse = {
        user: response.data.user,
        token: response.data.token,
      };
      return authResponse;
    }),
};

const parentAuthAPI = {
  register: (data: ParentRegisterData) =>
    post<AuthResponse>("parent/register", data),
  login: (data: ParentLoginData) =>
    post<any>("parent/login", data).then((response) => {
      const authResponse: AuthResponse = {
        user: response.data.user,
        token: response.data.token,
      };
      return authResponse;
    }),
};

const teacherAuthAPI = {
  register: (data: TeacherRegisterData) =>
    post<AuthResponse>("create-teacher", data),
  login: (data: TeacherLoginData) =>
    post<any>("teacher/login", data).then((response) => {
      const authResponse: AuthResponse = {
        user: response.teacher,
        token: response.token,
      };
      return authResponse;
    }),
};

const adminAuthAPI = {
  register: (data: AdminRegisterData) => post<AuthResponse>("admin", data),
  login: (data: AdminLoginData) =>
    post<any>("admin/login", data).then((response) => {
      const authResponse: AuthResponse = {
        user: response.admin,
        token: response.token,
      };
      return authResponse;
    }),
};

// -------------------- Teacher APIs --------------------

const teacherAPI = {
  getTests: (teacherId: string) => get<any[]>(`/teacher/${teacherId}/tests`),
  getTest: (testId: string) => get<any>(`/teacher/tests/${testId}`), // ✅ added
  createTest: (test: any) => post<any>("/teacher/tests", test),
  deleteTest: (testId: string) => del<any>(`/teacher/tests/${testId}`),
  getTestResults: (testId: string) =>
    get<any[]>(`/teacher/tests/${testId}/results`),
};

// -------------------- Admin APIs --------------------

const adminAPI = {
  getUsers: () => get<any[]>("/admin/users"),
  updateUser: (userId: string, data: any) =>
    post<any>(`/admin/users/${userId}`, data),
  createUser: (data: any) => post<any>("/admin/users", data),
  deleteUser: (userId: string) => del<any>(`/admin/users/${userId}`),
  assignTeacherToStudent: (teacherId: string, studentId: string) =>
    post<any>(`/admin/assign/teacher-to-student`, { teacherId, studentId }),
  assignParentToStudent: (parentId: string, studentId: string) =>
    post<any>(`/admin/assign/parent-to-student`, { parentId, studentId }),
};

// -------------------- Student APIs --------------------

const studentAPI = {
  getAssignedTests: (studentId: string) =>
    get<any[]>(`/student/${studentId}/tests`),
  getTest: (testId: string) => get<any>(`/student/tests/${testId}`),
  submitTest: (submission: any) =>
    post<any>("/student/submit-test", submission),
};

// -------------------- Parent APIs --------------------

const parentAPI = {
  getMe: () => get<any>("parent/me"),
  getChildren: () => get<any>("parent/student"),
  getStudentTests: (phoneNumber: string) =>
    get<any>(`parent/student/tests/?phone_number=${phoneNumber}`),
  getStudentTestDetails: (phoneNumber: string, testId: number) =>
    get<any>(
      `parent/student/test/detailed?phone_number=${phoneNumber}&test_id=${testId}`,
    ),
  getChildTestResults: (childId: string) =>
    get<any[]>(`/parent/student/${childId}/results`),
};

// -------------------- API Export --------------------

export const api = {
  auth: {
    student: studentAuthAPI,
    parent: parentAuthAPI,
    teacher: teacherAuthAPI,
    admin: adminAuthAPI,
    logout: () => {
      eraseCookie("authToken");
    },
    getCurrentUser: () => {
      const token = getAuthToken();
      if (!token) return null;
      const user = parseJwt(token);
      return { token, user };
    },
  },
  parent: parentAPI,
  teacher: teacherAPI,
  admin: adminAPI,
  student: studentAPI,
};
