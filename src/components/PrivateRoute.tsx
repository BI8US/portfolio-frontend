import React from "react";
import {Navigate} from "react-router-dom";
import {getToken} from "../utils/auth";
import {jwtDecode} from "jwt-decode";

interface PrivateRouteProps {
    children: React.ReactNode;
    role?: string;
}

interface JwtPayload {
    exp: number;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken: JwtPayload = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        console.log(decodedToken.exp);
        console.log(currentTime);

        if (decodedToken.exp < currentTime) {
            return <Navigate to="/login" replace/>;
        }
    } catch (error) {
        console.error("JWT decoding error:", error);
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
