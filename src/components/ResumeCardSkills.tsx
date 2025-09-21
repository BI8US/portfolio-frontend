import React from "react";
import {SkillItem} from "../types/skillTypes";
import {ContentCard} from "./ContentCard";
import {Button} from "./Button";
import {getGroupedSkillsNames} from "../utils/skillUtils";

export interface ResumeCardSkillsProps {
    skills: SkillItem[];
    onEditClick?: () => void;
}

export const ResumeCardSkills = ({ skills, onEditClick }: ResumeCardSkillsProps) => {
    const groupedSkills = getGroupedSkillsNames(skills);

    return (
        <ContentCard>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Skills</h2>
                {onEditClick && (
                    <Button
                        type="secondary"
                        onClick={onEditClick}
                        className="px-3 py-1"
                    >
                        Edit
                    </Button>
                )}
            </div>
            <div className="flex flex-col gap-4">
                {Object.entries(groupedSkills).map(([skillGroup, skillList]) => (
                    <div key={skillGroup} className="flex flex-col md:flex-row md:items-start">
                        <div className="font-semibold text-lg md:w-1/4 mb-2 md:mb-0">
                            {skillGroup}:
                        </div>
                        <div className="flex-1 md:w-3/4">
                            {skillList.join(", ")}
                        </div>
                    </div>
                ))}
            </div>
        </ContentCard>
    );
}