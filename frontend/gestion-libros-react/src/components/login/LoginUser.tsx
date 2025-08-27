import axios from 'axios';

// Define types for request and response data
interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string; // Or other authentication data like user info
  message?: string;
}

// Define the login function
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>('YOUR_API_BASE_URL/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors (e.g., network issues, server errors)
      console.error('Login error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    } else {
      // Handle other unexpected errors
      console.error('An unexpected error occurred during login:', error);
      throw new Error('An unexpected error occurred');
    }
  }
}