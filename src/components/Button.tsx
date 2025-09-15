import React from 'react';

interface ButtonProps {
    type?: 'primary' | 'secondary' | 'danger';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ type = 'primary', children, onClick, className }) => {
    const baseClasses = 'py-2 px-4 rounded-xl font-bold transition-colors duration-200';

    let typeClasses = '';
    switch (type) {
        case 'secondary':
            typeClasses = 'bg-gray-300 hover:bg-gray-400 text-white';
            break;
        case 'danger':
            typeClasses = 'bg-rose-500 hover:bg-rose-600 text-white';
            break;
        case 'primary':
        default:
            typeClasses = 'bg-sky-500 hover:bg-sky-600 text-white';
            break;
    }

    const allClasses = `${baseClasses} ${typeClasses} ${className || ''}`;

    return (
        <button className={allClasses} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;