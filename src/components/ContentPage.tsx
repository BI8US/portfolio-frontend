import React from "react";

interface ContentPageProps {
    children: React.ReactNode;
    className?: string;
}

export const ContentPage: React.FC<ContentPageProps> = ({ children, className }) => {
    const baseClasses = " max-w-4xl mx-auto pt-4 pb-4";
    const combinedClasses = `${baseClasses} ${className || ""}`;

    return (
        <div className={combinedClasses}>
            {children}
        </div>
    );
};