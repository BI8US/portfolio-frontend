import axios from 'axios';
import { toast } from 'sonner';

import { getToken } from '../utils/auth';

const baseURL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080/api';

export const api = axios.create({
    baseURL: baseURL,
});

api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 403) {
                toast.error('You do not have permission to do this.');
            }
        }
        return Promise.reject(error);
    },
);
