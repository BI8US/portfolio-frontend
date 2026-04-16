import { useMutation } from '@tanstack/react-query';

import { LoginDto } from '../../types/auth';
import { setToken } from '../../utils/auth';
import { login, LoginResponse } from './api';

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginDto>({
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token);
        },
    });
}
