import qs from 'qs';

import { LoginRequest, LoginResponse } from '../types/authTypes';
import { api } from './client';

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<{ token: string }>('/auth/login', qs.stringify(credentials), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return { token: response.data.token };
};
