import React from "react";
import { ProjectItemPartial } from "../types/projectTypes";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { ContentCard } from "./ContentCard";
import { Input } from "./Input";

interface ResumeEditProjectsModalProps {
    projects: ProjectItemPartial[];
    onSubmit: (projects: ProjectItemPartial[]) => void;
    onCancel: () => void;
}

export const ResumeEditProjectsModal: React.FC<ResumeEditProjectsModalProps> = ({projects, onSubmit, onCancel}) => {
    const [currentProjects, setCurrentProjects] = React.useState<ProjectItemPartial[]>(projects || []);

    const handleChange = (index: number, field: keyof ProjectItemPartial, value: string) => {
        const updatedProjects = [...currentProjects];
        updatedProjects[index] = { ...updatedProjects[index], [field]: value };
        setCurrentProjects(updatedProjects);
    };

    const handleAddProject = () => {
        setCurrentProjects([
            ...currentProjects,
            { title: "", subTitle: "", description: "", media: "" },
        ]);
    };

    const handleRemoveProject = (index: number) => {
        const updatedProjects = currentProjects.filter((_, i) => i !== index);
        setCurrentProjects(updatedProjects);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(currentProjects);
    };

    return (
        <Modal>
            <ContentCard>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Edit Projects</h2>

                    {currentProjects.map((project, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-lg">
                            <Input
                                type="text"
                                label="Project Title"
                                value={project.title || ""}
                                onChange={(e) => handleChange(index, "title", e.target.value)}
                            />
                            <Input
                                type="text"
                                label="Subtitle (optional)"
                                value={project.subTitle || ""}
                                onChange={(e) => handleChange(index, "subTitle", e.target.value)}
                            />
                            <Input
                                textarea
                                label="Description"
                                value={project.description || ""}
                                onChange={(e) => handleChange(index, "description", e.target.value)}
                            />
                            <div className="flex justify-end mt-2">
                                <Button
                                    type="secondary"
                                    onClick={() => handleRemoveProject(index)}
                                    htmlType="button"
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-start mt-4">
                        <Button type="secondary" onClick={handleAddProject} htmlType="button">
                            + Add Project
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
