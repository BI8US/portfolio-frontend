import React from "react";
import { EducationItemPartial } from "../types/educationTypes";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { ContentCard } from "./ContentCard";
import { Input } from "./Input";

interface ResumeEditEducationsModalProps {
    educations: EducationItemPartial[];
    onSubmit: (educations: EducationItemPartial[]) => void;
    onCancel: () => void;
}

export const ResumeEditEducationsModal: React.FC<ResumeEditEducationsModalProps> = ({educations, onSubmit, onCancel}) => {
    const [currentEducations, setCurrentEducations] = React.useState<EducationItemPartial[]>(educations || []);

    const handleChange = (index: number, field: keyof EducationItemPartial, value: string | string[]) => {
        const updatedEducations = [...currentEducations];
        if (field === "descriptionPoints" && typeof value === 'string') {
            updatedEducations[index] = {
                ...updatedEducations[index],
                [field]: value.split('\n')
            };
        } else {
            updatedEducations[index] = {
                ...updatedEducations[index],
                [field]: value
            };
        }
        setCurrentEducations(updatedEducations);
    };

    const handleAddEducation = () => {
        setCurrentEducations([...currentEducations, { school: '', educationName: '', startDate: '', endDate: '' }]);
    };

    const handleRemoveEducation = (index: number) => {
        const updatedEducations = currentEducations.filter((_, i) => i !== index);
        setCurrentEducations(updatedEducations);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(currentEducations);
    };

    return (
        <Modal>
            <ContentCard>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Edit Education</h2>
                    {currentEducations.map((edu, index) => (
                        <div key={index} className="mb-4 p-4 border rounded-lg">
                            <Input
                                type="text"
                                label="School"
                                value={edu.school || ""}
                                onChange={(e) => handleChange(index, "school", e.target.value)}
                            />
                            <Input
                                type="text"
                                label="Degree/Field"
                                value={edu.educationName || ""}
                                onChange={(e) => handleChange(index, "educationName", e.target.value)}
                            />
                            <div className="flex gap-4">
                                <Input
                                    type="text"
                                    label="Start Date"
                                    placeholder="e.g. 2018"
                                    value={edu.startDate || ""}
                                    onChange={(e) => handleChange(index, "startDate", e.target.value)}
                                />
                                <Input
                                    type="text"
                                    label="End Date"
                                    placeholder="e.g. 2022 or Present"
                                    value={edu.endDate || ""}
                                    onChange={(e) => handleChange(index, "endDate", e.target.value)}
                                />
                            </div>
                            <Input
                                textarea
                                label="Description Points (one per line)"
                                value={(edu.descriptionPoints || []).join('\n')}
                                onChange={(e) => handleChange(index, "descriptionPoints", e.target.value)}
                            />
                            <div className="flex justify-end mt-2">
                                <Button type="secondary" onClick={() => handleRemoveEducation(index)} htmlType="button">
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-start mt-4">
                        <Button type="secondary" onClick={handleAddEducation} htmlType="button">
                            + Add Education
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