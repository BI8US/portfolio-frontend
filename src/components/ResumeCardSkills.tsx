import React from "react";
import {SkillItem} from "../types/skillTypes";
import {ContentCard} from "./ContentCard";

export interface ResumeCardSkillsProps {
    skills: SkillItem[];
}

export const ResumeCardSkills = ({ skills }: ResumeCardSkillsProps) => {
    console.log(skills);
    const groupedSkills = skills.reduce((acc, item) => {
        if (!acc[item.skillGroup]) {
            acc[item.skillGroup] = [];
        }
        acc[item.skillGroup].push(item.name);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <ContentCard>
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
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