import {LoginRequest, LoginResponse} from "../types/authTypes";
import qs from "qs";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<string>(
        "/auth/login",
        qs.stringify(credentials),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    return {token: response.data};
};