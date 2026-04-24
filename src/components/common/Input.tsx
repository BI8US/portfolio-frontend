import React from 'react';

const baseInputClasses =
    'bg-content border border-border text-text-primary placeholder:text-text-muted p-2 w-full mb-2 rounded-3xl ' +
    'focus:outline-none focus:ring-1 focus:ring-text-accent';

const labelClasses = 'mb-1 font-medium text-text-secondary';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

type InputFieldProps = InputProps & { textarea?: false };
type TextAreaFieldProps = TextAreaProps & { textarea: true };

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, className, ...props }, ref) => {
        return (
            <div className="flex flex-col w-full">
                {label && <label className={labelClasses}>{label}</label>}
                <input ref={ref} {...props} className={`${baseInputClasses} ${className || ''}`} />
            </div>
        );
    },
);
InputComponent.displayName = 'InputComponent';

const TextAreaComponent = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, className, ...props }, ref) => {
        return (
            <div className="flex flex-col w-full">
                {label && <label className={labelClasses}>{label}</label>}
                <textarea
                    ref={ref}
                    {...props}
                    className={`${baseInputClasses} ${className || ''}`}
                    rows={props.rows || 4}
                />
            </div>
        );
    },
);
TextAreaComponent.displayName = 'TextAreaComponent';

type InputOverloads = {
    (props: InputFieldProps & React.RefAttributes<HTMLInputElement>): JSX.Element;
    (props: TextAreaFieldProps & React.RefAttributes<HTMLTextAreaElement>): JSX.Element;
};

const InputForwarded = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, any>(
    ({ textarea = false, ...props }: InputFieldProps | TextAreaFieldProps, ref) => {
        if (textarea) {
            return (
                <TextAreaComponent
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    {...(props as TextAreaProps)}
                />
            );
        }
        return (
            <InputComponent ref={ref as React.Ref<HTMLInputElement>} {...(props as InputProps)} />
        );
    },
);
InputForwarded.displayName = 'Input';

export const Input = InputForwarded as unknown as InputOverloads;
