import React from "react";

const baseInputClasses =
    "bg-content border border-border text-text-primary placeholder:text-text-muted p-2 w-full mb-2 rounded-3xl " +
    "focus:outline-none focus:ring-1 focus:ring-text-accent";

const labelClasses = "mb-1 font-medium text-text-secondary";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

const InputComponent: React.FC<InputProps> = ({ label, className,...props }) => {
    return (
        <div className="flex flex-col w-full">
            {label && <label className={labelClasses}>{label}</label>}
            <input
                {...props}
                className={`${baseInputClasses} ${className || ""}`}
            />
        </div>
    );
};

const TextAreaComponent: React.FC<TextAreaProps> = ({ label, className,...props }) => {
    return (
        <div className="flex flex-col w-full">
            {label && <label className={labelClasses}>{label}</label>}
            <textarea
                {...props}
                className={`${baseInputClasses} ${className || ""}`}
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