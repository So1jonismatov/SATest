import { getCookie, eraseCookie } from "@/function/cookies";
import type {
  StudentRegisterData,
  StudentLoginData,
  AuthResponse,
  Test,
  TestSubmission,
  UserAccess,
  User,
  PaginatedTests,
  PaginatedUsers
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

async function patch<T>(url: string, data: any): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${baseURL}${url}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API PATCH request failed");
  }

  return response.json();
}

// -------------------- Auth APIs --------------------

const authAPI = {
  register: (data: StudentRegisterData) =>
    post<AuthResponse>("/auth/register", data),
  login: (data: StudentLoginData) =>
    post<AuthResponse>("/auth/login", data),
  logout: () => {
    eraseCookie("authToken");
  },
  getCurrentUser: () => {
    const token = getAuthToken();
    if (!token) return null;
    const user = parseJwt(token);
    return { token, user };
  },
  updateUser: (userId: string, data: Partial<User>) => patch<User>(`/user/${userId}`, data),
};

// -------------------- Student APIs --------------------

const studentAPI = {
  getTests: (params?: { page?: number; limit?: number; subject?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.subject) queryParams.append('subject', params.subject);

    return get<PaginatedTests>(`/tests?${queryParams.toString()}`);
  },
  getTest: async (testId: string): Promise<TestWithAccess> => {
    const testData = await get<any>(`/tests/${testId}`);
    const currentUser = authAPI.getCurrentUser();
    const hasAccess = currentUser && testData.userAccesses.some((access: any) => access.user_id === currentUser.user.id);
    
    return {
      testId: testData.id.toString(),
      nomi: testData.nomi,
      subject: testData.subject,
      questionCount: testData.questions.length,
      isPremium: testData.is_premium,
      hasAccess: hasAccess || !testData.is_premium,
      jami_urinishlar: testData.jami_urinishlar,
      average: testData.average,
      questions: testData.questions,
    };
  },
  submitTest: (testId: string, submission: TestSubmission) =>
    post<any>(`/tests/${testId}/submit`, submission),
};

// -------------------- Teacher/Admin APIs --------------------

const teacherAPI = {
  createTest: (testData: any) => post<Test>("/tests", testData),
  grantAccess: (accessData: UserAccess) => post<any>("/admin/access", accessData),
  revokeAccess: (accessData: UserAccess) => del<any>(`/admin/access/${accessData.userId}/${accessData.testId}`),
  getUser: (userId: string) => get<User>(`/admin/users/${userId}`),
  getUsers: (params?: { page?: number; limit?: number; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);

    return get<PaginatedUsers>(`/admin/users?${queryParams.toString()}`);
  },
  deleteTest: (testId: string) => del<any>(`/tests/${testId}`),
  updateTest: (testId: string, testData: Partial<any>) => patch<any>(`/tests/${testId}`, testData),
  deleteUser: (userId: string) => del<any>(`/user/${userId}`),
  addUser: (userData: StudentRegisterData) => post<User>(`/user`, userData),
};

// -------------------- API Export --------------------

export const api = {
  auth: authAPI,
  student: studentAPI,
  teacher: teacherAPI,
};
