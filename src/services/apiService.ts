import axios, {AxiosRequestConfig} from 'axios';
import store from "@/store";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_PATH,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Axios request interceptor to set the Authorization token
apiClient.interceptors.request.use(
    (config) => {
        const authToken = store.getState().auth.authToken; // Get the token from Redux store
        if (authToken) {
            config.headers['Authorization'] = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Helper function for GET requests
export const get = async <T>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> => {
    const response = await apiClient.get(url, {params, ...config});
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
