import React from "react";

interface ContentCardProps {
    children: React.ReactNode;
    className?: string;
}

export const ContentCard: React.FC<ContentCardProps> = ({ children, className }) => {
    const baseClasses = "bg-content border border-border rounded-3xl shadow-md p-6 mb-4 w-full mx-auto";
    const combinedClasses = `${baseClasses} ${className || ""}`;

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};