import React from 'react';

interface ModalProps {
    children: React.ReactNode;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({ children, className }) => {
    const baseClasses =
        'fixed inset-0 bg-overlay bg-opacity-50 flex flex-col p-8 z-50 overflow-y-auto mx-auto';
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <div className={combinedClasses}>
            <div className="flex-1 flex justify-center items-start">
                <div className="max-w-4xl w-full">{children}</div>
            </div>
        </div>
    );
};
