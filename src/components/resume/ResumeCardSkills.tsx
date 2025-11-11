import React from "react";
import {SkillItem} from "../../types/skillTypes";
import {ContentCard} from "../common/ContentCard";
import {Button} from "../common/Button";
import {getGroupedSkillsNames} from "../../utils/skillUtils";

export interface ResumeCardSkillsProps {
    skills: SkillItem[];
    onEditClick?: () => void;
}

export const ResumeCardSkills = ({ skills, onEditClick }: ResumeCardSkillsProps) => {
    const groupedSkills = getGroupedSkillsNames(skills);

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-primary text-2xl">cards_star</span>
                    <h2 className="text-2xl font-bold text-text-primary">Skills</h2>
                </div>
                {onEditClick && (
                    <Button
                        type="secondary"
                        onClick={onEditClick}
                        className="px-3 py-1 border-transparent bg-page"
                    >
                        <span className="material-symbols-outlined text-2xl">edit</span>
                    </Button>
                )}
            </div>
            <ContentCard>
                <div className="flex flex-col gap-4">
                    {Object.entries(groupedSkills).map(([skillGroup, skillList]) => (
                        <div key={skillGroup}>
                            <div className="font-semibold text-lg text-text-primary mb-2">
                                {skillGroup}:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {skillList.map((skillName) => (
                                    <span
                                        key={skillName}
                                        className="px-3 py-1 bg-button-secondary-bg text-text-secondary border border-border rounded-full text-sm font-medium"
                                    >
                                    {skillName}
                                </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ContentCard>
        </>
    );
}