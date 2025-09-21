import React from "react";

interface ContentCardProps {
    children: React.ReactNode;
    className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({ children, className }) => {
    const baseClasses = "bg-white border border-gray-200 rounded-xl shadow-md max-w-4xl p-6 mb-4 w-full mx-auto";
    const combinedClasses = `${baseClasses} ${className || ""}`;

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};