import React, { useState } from "react";
import {JobApplicationItem} from "../../types/jobApplicationTypes";
import {ContentCard} from "../common/ContentCard";
import {Modal} from "../common/Modal";
import {Button} from "../common/Button";
import {Input} from "../common/Input";

export interface ApplicationInfo {
    company: string;
    role: string;
    link?: string;
    contact?: string;
    schedule?: string;
    description?: string;
}

export interface JobApplicationEditModalProps {
    application: JobApplicationItem;
    isOpen: boolean;
    onSubmit: (applicationInfo: ApplicationInfo) => void;
    onCancel: () => void;
}

export const JobApplicationEditModal: React.FC<JobApplicationEditModalProps> = ({application, isOpen, onSubmit, onCancel}) => {
    const [formData, setFormData] = useState<ApplicationInfo>({
        company: application.company,
        role: application.role,
        link: application.link || "",
        contact: application.contact || "",
        schedule: application.schedule || "",
        description: application.description || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <Modal>
            <ContentCard>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4 text-text-primary">Edit Job Application</h2>
                    <Input
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Link"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                    />
                    <Input
                        label="Schedule"
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleInputChange}
                    />
                    <Input
                        textarea
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="primary">
                            Save changes
                        </Button>
                    </div>
                </form>
            </ContentCard>
        </Modal>
    );
};