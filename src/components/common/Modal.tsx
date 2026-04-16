import React, { useEffect } from 'react';

interface ModalProps {
    children: React.ReactNode;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({ children, className }) => {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, []);

    const baseClasses =
        'fixed inset-0 bg-overlay/50 flex flex-col p-8 z-50 overflow-y-auto mx-auto backdrop-blur-sm';
    const combinedClasses = `${baseClasses} ${className || ''}`;

    return (
        <div className={combinedClasses}>
            <div className="flex-1 flex justify-center items-start">
                <div className="max-w-4xl w-full transform transition-all duration-300 ease-out">
                    {children}
                </div>
            </div>
        </div>
    );
};
