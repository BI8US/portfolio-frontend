import React from "react";

interface ContentPageProps {
    children: React.ReactNode;
    className?: string;
}

export const ContentPage: React.FC<ContentPageProps> = ({ children, className }) => {
    const baseClasses = "max-w-2xl mx-auto p-4";
    const combinedClasses = `${baseClasses} ${className || ""}`;

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};