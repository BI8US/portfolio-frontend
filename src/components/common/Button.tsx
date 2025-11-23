import React from 'react';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    type?: 'primary' | 'secondary' | 'danger';
    htmlType?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({ type = 'primary', htmlType = 'submit', children, className, ...props }) => {
    const baseClasses = 'py-2 px-4 rounded-full font-semibold duration-200 border-2';

    let typeClasses = '';
    switch (type) {
        case 'secondary':
            typeClasses = 'bg-content text-button-secondary border-button-secondary ' +
                'hover:bg-button-secondary hover:text-content hover:border-transparent ' +
                'active:bg-button-secondary active:text-content active:border-transparent';
            break;
        case 'danger':
            typeClasses = 'bg-content text-button-danger border-button-danger ' +
                'hover:bg-button-danger hover:text-content hover:border-transparent ' +
                'active:bg-button-danger active:text-content active:border-transparent';
            break;
        case 'primary':
        default:
            typeClasses = 'bg-content text-button-primary border-button-primary ' +
                'hover:bg-button-primary hover:text-content hover:border-transparent ' +
                'active:bg-button-primary active:text-content active:border-transparent';
            break;
    }

    const allClasses = `${baseClasses} ${typeClasses} ${className || ''}`;

    return (
        <button type={htmlType} className={allClasses} {...props}>
            {children}
        </button>
    );
};

