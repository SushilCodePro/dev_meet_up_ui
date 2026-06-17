// src/api/httpClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  // timeout: 10000,
  // withCredentials:true,
  headers: { 'Content-Type': 'application/json' },
});

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `${token}`;
//   }
//   return config;
// });

axios.interceptors.response.use((res) => res,async (error) => {

const original = error.config;

if (error.response?.status === 401 && !original._retry) {
  original._retry = true;
  await axios.post("/auth/refresh",{},{withCredentials: true});

      return axios(
        original
      );

    }

    return Promise.reject(
      error
    );

  }
);

export default apiClient;
