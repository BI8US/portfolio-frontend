import React from "react";
import {Button} from "./Button";

interface ConfirmationComponentProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    cancelText?: string;
    confirmText?: string;
    className?: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationComponentProps> = ({
    isOpen,
    title = "Confirm action",
    message = "",
    cancelText = "Cancel",
    confirmText = "Confirm",
    className = "",
    onCancel,
    onConfirm
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`bg-white rounded-lg shadow-xl p-6 w-full max-w-md ${className}`}>
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <div className="text-gray-700 mb-6">
                    {message}
                </div>
                <div className="flex justify-end space-x-2">
                    <Button
                        type="secondary"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        type="danger"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    )
};