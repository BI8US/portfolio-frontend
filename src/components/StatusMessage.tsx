import React from "react";
import { ContentPage } from "./ContentPage";

interface StatusMessageProps {
    message: string;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => {
    return (
        <ContentPage>
            <div className="text-2xl font-bold mb-6 text-center text-gray-500">
                {message}
            </div>
        </ContentPage>
    );
};