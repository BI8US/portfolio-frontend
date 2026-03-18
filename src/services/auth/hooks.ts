import { useMutation } from '@tanstack/react-query';

import { LoginRequest, LoginResponse } from '../../types/authTypes';
import { setToken } from '../../utils/auth';
import { login } from './api';

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token);
        },
    });
}
