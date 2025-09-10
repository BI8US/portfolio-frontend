import { api } from "./client";
import { LoginRequest, LoginResponse } from "../types/authTypes";
import qs from "qs";

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<string>(
        "/auth/login",
        qs.stringify(credentials),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return {token: response.data};
};