import React from "react";
import { WorkExperienceItemPartial } from "../types/workExperienceTypes";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { ContentCard } from "./ContentCard";
import { Input } from "./Input";

interface ResumeEditWorkExperiencesModalProps {
    workExperiences: WorkExperienceItemPartial[];
    onSubmit: (workExperiences: WorkExperienceItemPartial[]) => void;
    onCancel: () => void;
}

export const ResumeEditWorkExperiencesModal: React.FC<ResumeEditWorkExperiencesModalProps> = ({workExperiences, onSubmit, onCancel}) => {
    const [currentWorkExperiences, setCurrentWorkExperiences] = React.useState<WorkExperienceItemPartial[]>(workExperiences || []);

    const handleChange = (index: number, field: keyof WorkExperienceItemPartial, value: string) => {
        const updated = [...currentWorkExperiences];
        updated[index] = { ...updated[index], [field]: value };
        setCurrentWorkExperiences(updated);
    };

    const handleAddExperience = () => {
        setCurrentWorkExperiences([...currentWorkExperiences, { company: '', position: '', startDate: '', endDate: '' }]);
    };

    const handleRemoveExperience = (index: number) => {
        const updated = currentWorkExperiences.filter((_, i) => i !== index);
        setCurrentWorkExperiences(updated);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const sanitizedExperiences = currentWorkExperiences.map((exp) => {
            const descriptionText =
                typeof exp.descriptionPoints === "string"
                    ? exp.descriptionPoints
                    : Array.isArray(exp.descriptionPoints)
                        ? exp.descriptionPoints.map(p => p.descriptionPoint).join("\n")
                        : "";

            const points = descriptionText
                .split("\n")
                .map(p => p.trim())
                .filter(p => p !== "")
                .map((point, idx) => ({
                    id: exp.descriptionPoints?.[idx]?.id ?? -idx - 1,
                    educationEntityId: exp.id || 0,
                    descriptionPoint: point,
                }));

            return {
                ...exp,
                descriptionPoints: points,
            };
        });

        onSubmit(sanitizedExperiences);
    };

    return (
        <Modal>
            <ContentCard>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Edit Work Experience</h2>
                    {currentWorkExperiences.map((exp, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-lg">
                            <Input
                                type="text"
                                label="Company"
                                value={exp.company || ""}
                                onChange={(e) => handleChange(index, "company", e.target.value)}
                            />
                            <Input
                                type="text"
                                label="Position"
                                value={exp.position || ""}
                                onChange={(e) => handleChange(index, "position", e.target.value)}
                            />
                            <div className="flex gap-4">
                                <Input
                                    type="text"
                                    label="Start Date"
                                    placeholder="e.g. 2020"
                                    value={exp.startDate || ""}
                                    onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                />
                                <Input
                                    type="text"
                                    label="End Date"
                                    placeholder="e.g. 2023 or Present"
                                    value={exp.endDate || ""}
                                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                />
                            </div>
                            <Input
                                textarea
                                label="Description Points (one per line)"
                                value={Array.isArray(exp.descriptionPoints)
                                    ? exp.descriptionPoints.map(p => p.descriptionPoint).join("\n")
                                    : exp.descriptionPoints || ""}
                                onChange={(e) => handleChange(index, "descriptionPoints", e.target.value)}
                            />
                            <div className="flex justify-end mt-2">
                                <Button type="secondary" onClick={() => handleRemoveExperience(index)} htmlType="button">
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-start mt-4">
                        <Button type="secondary" onClick={handleAddExperience} htmlType="button">
                            + Add Work Experience
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