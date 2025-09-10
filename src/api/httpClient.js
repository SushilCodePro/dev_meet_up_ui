// src/api/httpClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (error) => {
    // Central error handling/logging
    console.error('API call failed:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Optionally handle logout or token refresh here
    }
    return Promise.reject(error);
  }
);

export default apiClient;
