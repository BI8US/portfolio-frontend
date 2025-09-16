import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

const InputComponent: React.FC<InputProps> = ({ label, ...props }) => {
    const baseClasses = "border p-2 w-full mb-2 rounded";

    return (
        <div className="flex flex-col w-full">
            {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
            <input
                {...props}
                className={baseClasses}
            />
        </div>
    );
};

const TextAreaComponent: React.FC<TextAreaProps> = ({ label, ...props }) => {
    const baseClasses = "border p-2 w-full mb-2 rounded";

    return (
        <div className="flex flex-col w-full">
            {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
            <textarea
                {...props}
                className={baseClasses}
                rows={props.rows || 4}
            />
        </div>
    );
};

export const Input = ({ textarea = false, ...props }: InputProps & TextAreaProps & { textarea?: boolean }) => {
    if (textarea) {
        return <TextAreaComponent {...props as TextAreaProps} />;
    }
    return <InputComponent {...props as InputProps} />;
};