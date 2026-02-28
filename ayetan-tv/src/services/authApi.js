import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('API Base URL:', API_BASE_URL);

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Log responses for debugging
authApi.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error Details:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      error: error.response?.data?.error,
      fullError: error.response?.data,
      url: error.config?.url,
      method: error.config?.method,
    });
    return Promise.reject(error);
  }
);

export const signup = (userData) => {
  return authApi.post('/auth/signup', userData);
};

export const login = (email, password) => {
  return authApi.post('/auth/login', { email, password });
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getProfile = () => {
  return authApi.get('/auth/profile');
};

export default authApi;
