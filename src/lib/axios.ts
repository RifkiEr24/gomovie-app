import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Static token for the products API
const token = process.env.NEXT_PUBLIC_API_TOKEN;
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  },
});


apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {

    if (error.response?.status === 401) {
      console.error('Unauthorized! Token may be expired or invalid. Logging out.');

      localStorage.removeItem('accessToken');

   
    }

    return Promise.reject(error);
  }
);

export default apiClient;
