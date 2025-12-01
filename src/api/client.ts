import axios from 'axios';
import { toast } from 'sonner';

import { getToken } from '../utils/auth';

const PROD_URL = process.env.REACT_APP_API_URL;
const DEV_URL = process.env.REACT_APP_API_URL_DEV;

const getBaseURL = () => {
    if (process.env.NODE_ENV === 'production') {
        return PROD_URL;
    }
    return DEV_URL;
};

export const api = axios.create({
    baseURL: getBaseURL(),
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
