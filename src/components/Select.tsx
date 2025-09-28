import React, { useState, useEffect, useRef } from "react";

interface Option {
    label: string;
    value: string;
}

// Убран extends React.HTMLAttributes<HTMLDivElement>
interface SelectProps {
    label?: string;
    placeholder?: string;
    options: Option[];
    name: string;
    value?: string;
    onChange?: (value: string) => void;
    required?: boolean;
    className?: string;
    buttonClassName?: string;
}

export const Select: React.FC<SelectProps> = ({
                                                  label,
                                                  placeholder = "Select...",
                                                  options,
                                                  name,
                                                  value,
                                                  onChange,
                                                  required,
                                                  className,
                                                  buttonClassName,
                                                  ...props
                                              }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Option | null>(
        options.find(opt => opt.value === value) || null
    );
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSelected(options.find(opt => opt.value === value) || null);
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const handleSelect = (option: Option) => {
        setSelected(option);
        setIsOpen(false);
        onChange?.(option.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            setIsOpen(!isOpen);
        } else if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const combinedClasses = `flex flex-col mb-2 w-full relative ${className || ''}`.trim();

    const baseButtonClasses = "border p-1.5 w-full rounded-lg flex justify-between items-center transition-colors duration-150";
    const finalButtonClasses = `${baseButtonClasses} ${buttonClassName || 'bg-white'}`.trim();

    return (
        <div className={combinedClasses} ref={wrapperRef} {...props}>
            {label && (
                <label className="mb-1 font-medium text-gray-700">
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                className={finalButtonClasses}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{selected ? selected.label : placeholder}</span>
                <span className="ml-2 flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10 12l-6-6h12z" />
                    </svg>
                </span>
            </button>

            {isOpen && (
                <ul
                    className="absolute top-full left-0 w-full border rounded-lg bg-white shadow-lg z-10 max-h-48 overflow-y-auto"
                    role="listbox"
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(option)}
                            role="option"
                            aria-selected={selected?.value === option.value}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
            <input
                type="hidden"
                name={name}
                value={selected?.value || ''}
                required={required}
            />
        </div>
    );
};