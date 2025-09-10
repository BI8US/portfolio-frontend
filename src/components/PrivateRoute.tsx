import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../utils/auth";

interface PrivateRouteProps {
    children: React.ReactNode;
    role?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }


    return <>{children}</>;
};
