// API service for authentication endpoints
import type { RegisterRequest, LoginRequest, LoginResponse } from '@/db/schema';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Register a new user
export const registerUser = async (userData: Omit<RegisterRequest, 'role'>): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...userData,
      role: 'student', // Default role is student
    }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

// Login user
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};