import React from 'react';

import { Button } from './Button';
import { ContentCard } from './ContentCard';
import { Modal } from './Modal';

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
    title = 'Confirm action',
    message = '',
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    className = '',
    onCancel,
    onConfirm,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Modal>
            <ContentCard className={`max-w-md ${className}`}>
                <div>
                    <h3 className="text-text-primary text-xl font-bold mb-4">{title}</h3>
                    <div className="text-text-secondary mb-6">{message}</div>
                    <div className="flex justify-end space-x-2">
                        <Button type="secondary" onClick={onCancel}>
                            {cancelText}
                        </Button>
                        <Button type="danger" onClick={onConfirm}>
                            {confirmText}
                        </Button>
                    </div>
                </div>
            </ContentCard>
        </Modal>
    );
};
