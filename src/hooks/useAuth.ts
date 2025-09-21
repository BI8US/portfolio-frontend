import {useMutation} from "@tanstack/react-query";
import {login} from "../api/authApi";
import {LoginRequest, LoginResponse} from "../types/authTypes";
import {setToken} from "../utils/auth";

export function useLogin() {
    return useMutation<LoginResponse, Error, LoginRequest>({
        mutationFn: login,
        onSuccess: (data) => {
            setToken(data.token);
        },
    });
}
