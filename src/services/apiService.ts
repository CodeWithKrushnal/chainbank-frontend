// src/services/apiService.ts
import axios, { AxiosRequestConfig } from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function for GET requests
export const get = async <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get(url, { params, ...config });
  console.log("Data",response.data);
  return response.data;
};

// Helper function for POST requests
export const post = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.post(url, data, config);
  return response.data;
};

// Helper function for PUT requests
export const put = async <T>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.put(url, data, config);
  return response.data;
};

// Helper function for DELETE requests
export const deleteRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.delete(url, config);
  return response.data;
};
