import React from 'react';

import { WorkExperienceItem } from '../../../types/resume';
import { moveItemInArray } from '../../../utils/sortUtils';
import { Button } from '../../common/Button';
import { ContentCard } from '../../common/ContentCard';
import { Input } from '../../common/Input';
import { Modal } from '../../common/Modal';
import { SortButtons } from '../../common/SortButtons';

interface ResumeEditWorkExperiencesModalProps {
    initialWorkExperiences: WorkExperienceItem[];
    onSubmit: (workExperiences: WorkExperienceItem[]) => void;
    onCancel: () => void;
}

export const ResumeEditWorkExperiencesModal: React.FC<ResumeEditWorkExperiencesModalProps> = ({
    initialWorkExperiences,
    onSubmit,
    onCancel,
}) => {
    const [currentWorkExperiences, setCurrentWorkExperiences] = React.useState<
        WorkExperienceItem[]
    >(initialWorkExperiences || []);

    const handleChange = (index: number, field: keyof WorkExperienceItem, value: string) => {
        const updated = [...currentWorkExperiences];
        updated[index] = { ...updated[index], [field]: value };
        setCurrentWorkExperiences(updated);
    };

    const handleAddExperience = () => {
        setCurrentWorkExperiences([
            ...currentWorkExperiences,
            {
                company: '',
                position: '',
                startDate: '',
                endDate: '',
                description: '',
                sortOrder: currentWorkExperiences.length,
            },
        ]);
    };

    const handleRemoveExperience = (index: number) => {
        const updated = currentWorkExperiences
            .filter((_, i) => i !== index)
            .map((item, i) => ({ ...item, sortOrder: i }));
        setCurrentWorkExperiences(updated);
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const updated = moveItemInArray(currentWorkExperiences, index, direction);
        setCurrentWorkExperiences(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(currentWorkExperiences);
    };

    return (
        <Modal>
            <ContentCard className="max-w-3xl w-full">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4 text-text-primary">
                        Edit Work Experience
                    </h2>

                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                        {currentWorkExperiences.map((exp, index) => (
                            <div
                                key={index}
                                className="p-4 border border-border rounded-3xl relative bg-page/30"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-text-secondary">
                                        Position #{index + 1}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <SortButtons
                                            onMoveUp={() => handleMove(index, 'up')}
                                            onMoveDown={() => handleMove(index, 'down')}
                                            disableUp={index === 0}
                                            disableDown={
                                                index === currentWorkExperiences.length - 1
                                            }
                                            layout="row"
                                            className="bg-page border border-border rounded-full shadow-sm"
                                        />
                                        <Button
                                            type="danger"
                                            onClick={() => handleRemoveExperience(index)}
                                            htmlType="button"
                                            className="border-transparent p-1 min-w-0"
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                delete
                                            </span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                                    <Input
                                        type="text"
                                        label="Company"
                                        value={exp.company || ''}
                                        onChange={(e) =>
                                            handleChange(index, 'company', e.target.value)
                                        }
                                        placeholder="Google"
                                    />
                                    <Input
                                        type="text"
                                        label="Position"
                                        value={exp.position || ''}
                                        onChange={(e) =>
                                            handleChange(index, 'position', e.target.value)
                                        }
                                        placeholder="Senior Developer"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        onChange={(e) =>
                                            handleChange(index, 'endDate', e.target.value)
                                        }
                                    />
                                </div>
                                <Input
                                    textarea
                                    label="Description (Markdown supported)"
                                    value={exp.description || ''}
                                    onChange={(e) =>
                                        handleChange(index, 'description', e.target.value)
                                    }
                                    rows={4}
                                    className="mb-0"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-start mt-6">
                        <Button
                            type="secondary"
                            onClick={handleAddExperience}
                            htmlType="button"
                            className="flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-2xl">add</span>
                            <span>Add Experience</span>
                        </Button>
                    </div>

                    <div className="flex justify-end gap-2 mt-6 border-t pt-4">
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
