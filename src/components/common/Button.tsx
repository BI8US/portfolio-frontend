import React from 'react';

interface ButtonProps {
    type?: 'primary' | 'secondary' | 'danger';
    htmlType?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({ type = 'primary', htmlType = 'submit', children, onClick, className }) => {
    const baseClasses = 'py-2 px-4 rounded-full font-semibold duration-200 border-2';

    let typeClasses = '';
    switch (type) {
        case 'secondary':
            typeClasses = 'bg-content text-button-secondary border-button-secondary hover:hover:bg-button-secondary hover:hover:text-content hover:hover:border-transparent';
            break;
        case 'danger':
            typeClasses = 'bg-content text-button-danger border-button-danger hover:hover:bg-button-danger hover:hover:text-content hover:hover:border-transparent';
            break;
        case 'primary':
        default:
            typeClasses = 'bg-content text-button-primary border-button-primary hover:hover:bg-button-primary hover:hover:text-content hover:hover:border-transparent';
            break;
    }

    const allClasses = `${baseClasses} ${typeClasses} ${className || ''}`;

    return (
        <button type={htmlType} className={allClasses} onClick={onClick}>
            {children}
        </button>
    );
};

