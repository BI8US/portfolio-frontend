import React from 'react';

import { WorkExperienceItemPartial } from '../../types/workExperienceTypes';
import { Button } from '../common/Button';
import { ContentCard } from '../common/ContentCard';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';

interface ResumeEditWorkExperiencesModalProps {
    workExperiences: WorkExperienceItemPartial[];
    onSubmit: (workExperiences: WorkExperienceItemPartial[]) => void;
    onCancel: () => void;
}

export const ResumeEditWorkExperiencesModal: React.FC<ResumeEditWorkExperiencesModalProps> = ({
    workExperiences,
    onSubmit,
    onCancel,
}) => {
    const [currentWorkExperiences, setCurrentWorkExperiences] = React.useState<
        WorkExperienceItemPartial[]
    >(workExperiences || []);

    const handleChange = (index: number, field: keyof WorkExperienceItemPartial, value: string) => {
        const updated = [...currentWorkExperiences];
        updated[index] = { ...updated[index], [field]: value };
        setCurrentWorkExperiences(updated);
    };

    const handleAddExperience = () => {
        setCurrentWorkExperiences([
            ...currentWorkExperiences,
            { company: '', position: '', startDate: '', endDate: '', description: '' },
        ]);
    };

    const handleRemoveExperience = (index: number) => {
        const updated = currentWorkExperiences.filter((_, i) => i !== index);
        setCurrentWorkExperiences(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(currentWorkExperiences);
    };

    return (
        <Modal>
            <ContentCard>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4 text-text-primary">
                        Edit Work Experience
                    </h2>
                    {currentWorkExperiences.map((exp, index) => (
                        <div key={index} className="mb-4 p-4 border border-border rounded-3xl">
                            <Input
                                type="text"
                                label="Company"
                                value={exp.company || ''}
                                onChange={(e) => handleChange(index, 'company', e.target.value)}
                            />
                            <Input
                                type="text"
                                label="Position"
                                value={exp.position || ''}
                                onChange={(e) => handleChange(index, 'position', e.target.value)}
                            />
                            <div className="flex gap-4">
                                <Input
                                    type="text"
                                    label="Start Date"
                                    placeholder="e.g. 2020"
                                    value={exp.startDate || ''}
                                    onChange={(e) =>
                                        handleChange(index, 'startDate', e.target.value)
                                    }
                                />
                                <Input
                                    type="text"
                                    label="End Date"
                                    placeholder="e.g. 2023 or Present"
                                    value={exp.endDate || ''}
                                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                />
                            </div>
                            <Input
                                textarea
                                label="Description (Markdown supported)"
                                value={exp.description || ''}
                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                rows={4}
                            />
                            <div className="flex justify-end mt-2">
                                <Button
                                    type="danger"
                                    onClick={() => handleRemoveExperience(index)}
                                    htmlType="button"
                                    className="border-transparent"
                                >
                                    <span className="material-symbols-outlined text-2xl">
                                        delete
                                    </span>
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-start mt-4">
                        <Button type="secondary" onClick={handleAddExperience} htmlType="button">
                            <span className="material-symbols-outlined text-2xl">add_2</span>
                        </Button>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
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
