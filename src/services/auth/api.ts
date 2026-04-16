import { LoginDto } from '../../types/auth';
import { api } from '../client';

export interface LoginResponse {
    token: string;
}

export const login = async (credentials: LoginDto): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
};
