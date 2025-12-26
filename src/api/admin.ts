// API service for admin features
import type { CreateTestRequest, GetUserDetailsResponse, GetUsersResponse, CreateUserRequest } from '@/db/schema';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create a new test
export const createTest = async (testData: CreateTestRequest): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
    body: JSON.stringify(testData),
  });

  if (!response.ok) {
    throw new Error('Failed to create test');
  }
};

// Grant access to a test for a user
export const grantAccess = async (accessData: { userId: string, testId: string | number }): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/access`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
    body: JSON.stringify(accessData),
  });

  if (!response.ok) {
    throw new Error('Failed to grant access');
  }
};

// Revoke access to a test for a user
export const revokeAccess = async (userId: string, testId: string | number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/access`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
    body: JSON.stringify({ userId, testId }),
  });

  if (!response.ok) {
    throw new Error('Failed to revoke access');
  }
};

// Get user details
export const getUserDetails = async (userId: string): Promise<GetUserDetailsResponse> => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user details');
  }

  return response.json();
};

// Get list of users with pagination and search
export const getUsers = async (
  page: number = 1, 
  limit: number = 10, 
  search?: string
): Promise<GetUsersResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (search) {
    params.append('search', search);
  }
  
  const response = await fetch(`${API_BASE_URL}/admin/users?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

// Delete a user
export const deleteUser = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
};

// Add a new user
export const addUser = async (userData: CreateUserRequest): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to add user');
  }
};

// Grant all tests access to a user
export const grantAllAccess = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/access/all`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to grant all access');
  }
};

// Revoke all tests access from a user
export const revokeAllAccess = async (userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/admin/access/all`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
    body: JSON.stringify({ userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to revoke all access');
  }
};