import React, { useEffect, useState } from 'react';

import { JobApplicationResponse } from '../../types/jobApplication';
import { Button } from '../common/Button';
import { ContentCard } from '../common/ContentCard';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';

export interface ApplicationInfo {
    company: string;
    role: string;
    link?: string;
    contact?: string;
    schedule?: string;
    description?: string;
}

export interface JobApplicationEditModalProps {
    application: JobApplicationResponse;
    isOpen: boolean;
    onSubmit: (applicationInfo: ApplicationInfo) => void;
    onCancel: () => void;
}

export const JobApplicationEditModal: React.FC<JobApplicationEditModalProps> = ({
    application,
    isOpen,
    onSubmit,
    onCancel,
}) => {
    const [formData, setFormData] = useState<ApplicationInfo>({
        company: '',
        role: '',
        link: '',
        contact: '',
        schedule: '',
        description: '',
    });

    useEffect(() => {
        if (isOpen && application) {
            setFormData({
                company: application.company || '',
                role: application.role || '',
                link: application.link || '',
                contact: application.contact || '',
                schedule: application.schedule || '',
                description: application.description || '',
            });
        }
    }, [isOpen, application]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <Modal>
            <ContentCard className="max-w-2xl w-full">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center gap-2 mb-6">
                        <span className="material-symbols-outlined text-text-primary text-2xl">
                            edit_note
                        </span>
                        <h2 className="text-2xl font-bold text-text-primary">Edit Job Info</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Input
                            label="Company"
                            name="company"
                            placeholder="e.g. OpenAI"
                            value={formData.company}
                            onChange={handleInputChange}
                            required
                        />
                        <Input
                            label="Role"
                            name="role"
                            placeholder="e.g. Fullstack Developer"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <Input
                        label="Job Link"
                        name="link"
                        placeholder="https://..."
                        value={formData.link}
                        onChange={handleInputChange}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Input
                            label="Contact Person"
                            name="contact"
                            placeholder="Recruiter name or email"
                            value={formData.contact}
                            onChange={handleInputChange}
                        />
                        <Input
                            label="Schedule"
                            name="schedule"
                            placeholder="e.g. Remote, Hybrid"
                            value={formData.schedule}
                            onChange={handleInputChange}
                        />
                    </div>

                    <Input
                        textarea
                        label="Description"
                        name="description"
                        placeholder="Copy job description here..."
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={5}
                        className="mb-0"
                    />

                    <div className="flex justify-end gap-3 mt-8 border-t pt-6">
                        <Button type="secondary" onClick={onCancel} htmlType="button">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Save changes
                        </Button>
                    </div>
                </form>
            </ContentCard>
        </Modal>
    );
};
