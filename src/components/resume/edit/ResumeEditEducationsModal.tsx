import React from 'react';

import { EducationItem } from '../../../types/resume';
import { moveItemInArray } from '../../../utils/sortUtils';
import { Button } from '../../common/Button';
import { ContentCard } from '../../common/ContentCard';
import { Input } from '../../common/Input';
import { Modal } from '../../common/Modal';
import { SortButtons } from '../../common/SortButtons';

interface ResumeEditEducationsModalProps {
    initialEducations: EducationItem[];
    onSubmit: (educations: EducationItem[]) => void;
    onCancel: () => void;
}

export const ResumeEditEducationsModal: React.FC<ResumeEditEducationsModalProps> = ({
    initialEducations,
    onSubmit,
    onCancel,
}) => {
    const [currentEducations, setCurrentEducations] = React.useState<EducationItem[]>(
        initialEducations || [],
    );

    const handleChange = (index: number, field: keyof EducationItem, value: string) => {
        const updated = [...currentEducations];
        updated[index] = { ...updated[index], [field]: value };
        setCurrentEducations(updated);
    };

    const handleAddEducation = () => {
        setCurrentEducations([
            ...currentEducations,
            {
                school: '',
                educationName: '',
                startDate: '',
                endDate: '',
                description: '',
                sortOrder: currentEducations.length,
            },
        ]);
    };

    const handleRemoveEducation = (index: number) => {
        const updated = currentEducations
            .filter((_, i) => i !== index)
            .map((edu, i) => ({ ...edu, sortOrder: i }));
        setCurrentEducations(updated);
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const updated = moveItemInArray(currentEducations, index, direction);
        setCurrentEducations(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(currentEducations);
    };

    return (
        <Modal>
            <ContentCard className="max-w-3xl w-full">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4 text-text-primary">Edit Education</h2>

                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                        {currentEducations.map((edu, index) => (
                            <div
                                key={edu.id || `new-${index}`}
                                className="p-4 border border-border rounded-3xl relative bg-page/30"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-text-secondary">
                                        Education #{index + 1}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <SortButtons
                                            onMoveUp={() => handleMove(index, 'up')}
                                            onMoveDown={() => handleMove(index, 'down')}
                                            disableUp={index === 0}
                                            disableDown={index === currentEducations.length - 1}
                                            layout="row"
                                            className="bg-page border border-border rounded-full shadow-sm"
                                        />
                                        <Button
                                            type="danger"
                                            onClick={() => handleRemoveEducation(index)}
                                            htmlType="button"
                                            className="border-transparent p-1 min-w-0"
                                        >
                                            <span className="material-symbols-outlined text-xl">
                                                delete
                                            </span>
                                        </Button>
                                    </div>
                                </div>

                                <Input
                                    type="text"
                                    label="School"
                                    value={edu.school || ''}
                                    onChange={(e) => handleChange(index, 'school', e.target.value)}
                                    placeholder="University of Life"
                                />
                                <Input
                                    type="text"
                                    label="Degree/Field"
                                    value={edu.educationName || ''}
                                    onChange={(e) =>
                                        handleChange(index, 'educationName', e.target.value)
                                    }
                                    placeholder="Computer Science"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        type="text"
                                        label="Start Date"
                                        placeholder="e.g. 2018"
                                        value={edu.startDate || ''}
                                        onChange={(e) =>
                                            handleChange(index, 'startDate', e.target.value)
                                        }
                                    />
                                    <Input
                                        type="text"
                                        label="End Date"
                                        placeholder="e.g. 2022 or Present"
                                        value={edu.endDate || ''}
                                        onChange={(e) =>
                                            handleChange(index, 'endDate', e.target.value)
                                        }
                                    />
                                </div>

                                <Input
                                    textarea
                                    label="Description (Markdown supported)"
                                    value={edu.description || ''}
                                    onChange={(e) =>
                                        handleChange(index, 'description', e.target.value)
                                    }
                                    rows={3}
                                    className="mb-0"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-start mt-6">
                        <Button
                            type="secondary"
                            onClick={handleAddEducation}
                            htmlType="button"
                            className="flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-2xl">add</span>
                            <span>Add Education</span>
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
