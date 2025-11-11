import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface Option {
    label: string;
    value: string;
}

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
        options.find((opt) => opt.value === value) || null
    );
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState<{
        top: number;
        left: number;
        width: number;
    }>({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        setSelected(options.find((opt) => opt.value === value) || null);
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(target) &&
                (!dropdownRef.current || !dropdownRef.current.contains(target))
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: Option) => {
        setSelected(option);
        setIsOpen(false);
        onChange?.(option.value);
    };

    const handleToggle = () => {
        if (wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }
        setIsOpen((prev) => !prev);
    };

    const combinedClasses = `flex flex-col mb-2 w-full relative ${className || ""}`.trim();
    const baseButtonClasses =
        "border border-border p-2 w-full rounded-3xl flex justify-between items-center transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-text-accent";
    const finalButtonClasses = `${baseButtonClasses} ${
        buttonClassName || "bg-content"
    } ${selected ? 'text-text-primary' : 'text-text-muted'}`.trim();

    return (
        <div className={combinedClasses} ref={wrapperRef} {...props}>
            {label && <label className="mb-1 font-medium text-text-secondary">{label}</label>}

            <button
                type="button"
                onClick={handleToggle}
                className={finalButtonClasses}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{selected ? selected.label : placeholder}</span>
                <span className="ml-2 flex items-center">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-text-muted"
              viewBox="0 0 20 20"
              fill="currentColor"
          >
            <path d="M10 12l-6-6h12z" />
          </svg>
        </span>
            </button>

            {isOpen &&
                createPortal(
                    <ul
                        ref={dropdownRef}
                        className="absolute border border-border rounded-xl bg-content shadow-lg z-[9999] max-h-48 overflow-y-auto"
                        style={{
                            position: "absolute",
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                            width: dropdownPosition.width,
                        }}
                        role="listbox"
                    >
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`
                                    p-2 hover:text-text-accent cursor-pointer
                                    ${selected?.value === option.value
                                    ? 'font-semibold text-text-accent'
                                    : 'text-text-primary'
                                }
                                `}
                                onClick={() => handleSelect(option)}
                                role="option"
                                aria-selected={selected?.value === option.value}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>,
                    document.body
                )}

            <input type="hidden" name={name} value={selected?.value || ""} required={required} />
        </div>
    );
};
