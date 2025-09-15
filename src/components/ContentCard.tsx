import React from "react";

interface ContentCardProps {
    children: React.ReactNode;
    className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({ children, className }) => {
    const baseClasses = "bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-4 max-w-2xl mx-auto";
    const combinedClasses = `${baseClasses} ${className || ""}`;

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};