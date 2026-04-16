import React from 'react';

import { ProjectItem } from '../../../types/resume';
import { moveItemInArray } from '../../../utils/sortUtils';
import { Button } from '../../common/Button';
import { ContentCard } from '../../common/ContentCard';
import { Input } from '../../common/Input';
import { Modal } from '../../common/Modal';
import { SortButtons } from '../../common/SortButtons';

interface ResumeEditProjectsModalProps {
    initialProjects: ProjectItem[];
    onSubmit: (projects: ProjectItem[]) => void;
    onCancel: () => void;
}

export const ResumeEditProjectsModal: React.FC<ResumeEditProjectsModalProps> = ({
    initialProjects,
    onSubmit,
    onCancel,
}) => {
    const [currentProjects, setCurrentProjects] = React.useState<ProjectItem[]>(
        initialProjects || [],
    );

    const handleChange = (index: number, field: keyof ProjectItem, value: string) => {
        const updated = [...currentProjects];
        updated[index] = { ...updated[index], [field]: value };
        setCurrentProjects(updated);
    };

    const handleAddProject = () => {
        setCurrentProjects([
            ...currentProjects,
            {
                title: '',
                subTitle: '',
                description: '',
                media: '',
                sortOrder: currentProjects.length,
            },
        ]);
    };

    const handleRemoveProject = (index: number) => {
        const updated = currentProjects
            .filter((_, i) => i !== index)
            .map((item, i) => ({ ...item, sortOrder: i }));
        setCurrentProjects(updated);
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const updated = moveItemInArray(currentProjects, index, direction);
        setCurrentProjects(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(currentProjects);
    };

    return (
        <Modal>
            <ContentCard className="max-w-3xl w-full">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4 text-text-primary">Edit Projects</h2>

                    <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
                        {currentProjects.map((project, index) => (
                            <div
                                key={project.id || `new-${index}`}
                                className="p-4 border border-border rounded-3xl relative bg-page/30"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-text-secondary">
                                        Project #{index + 1}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <SortButtons
                                            onMoveUp={() => handleMove(index, 'up')}
                                            onMoveDown={() => handleMove(index, 'down')}
                                            disableUp={index === 0}
                                            disableDown={index === currentProjects.length - 1}
                                            layout="row"
                                            className="bg-page border border-border rounded-full shadow-sm"
                                        />
                                        <Button
                                            type="danger"
                                            onClick={() => handleRemoveProject(index)}
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
                                        label="Project Title"
                                        value={project.title || ''}
                                        onChange={(e) =>
                                            handleChange(index, 'title', e.target.value)
                                        }
                                        placeholder="Portfolio Website"
                                    />
                                    <Input
                                        type="text"
                                        label="Subtitle (optional)"
                                        value={project.subTitle || ''}
                                        onChange={(e) =>
                                            handleChange(index, 'subTitle', e.target.value)
                                        }
                                        placeholder="Fullstack React App"
                                    />
                                </div>
                                <Input
                                    textarea
                                    label="Description (Markdown supported)"
                                    value={project.description || ''}
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
                            onClick={handleAddProject}
                            htmlType="button"
                            className="flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-2xl">add</span>
                            <span>Add Project</span>
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
