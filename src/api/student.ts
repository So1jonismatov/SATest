// API service for student features
import type { GetTestsResponse, GetTestByIdResponse, SubmitTestRequest } from '@/db/schema';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Get tests with pagination and filtering
export const getTests = async (
  page: number = 1, 
  limit: number = 10, 
  subject?: string
): Promise<GetTestsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  
  if (subject) {
    params.append('subject', subject);
  }
  
  const response = await fetch(`${API_BASE_URL}/tests?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tests');
  }

  return response.json();
};

// Get a specific test by ID
export const getTestById = async (testId: number): Promise<GetTestByIdResponse> => {
  const response = await fetch(`${API_BASE_URL}/tests/${testId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch test');
  }

  return response.json();
};

// Submit test answers and score
export const submitTest = async (testId: number, requestData: SubmitTestRequest): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tests/${testId}/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
    },
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit test');
  }
};