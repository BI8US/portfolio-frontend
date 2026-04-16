import React from 'react';

import { SkillGroupItem } from '../../../types/resume';
import { Button } from '../../common/Button';
import { ContentCard } from '../../common/ContentCard';

export interface ResumeCardSkillsProps {
    skillGroups: SkillGroupItem[];
    onEditClick?: () => void;
}

export const ResumeCardSkills = ({ skillGroups, onEditClick }: ResumeCardSkillsProps) => {
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-primary text-2xl">
                        cards_star
                    </span>
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
                    {skillGroups.map((group) => (
                        <div key={group.id ?? group.name}>
                            <div className="font-semibold text-lg text-text-primary mb-2">
                                {group.name}:
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {group.skills.map((skill) => (
                                    <span
                                        key={skill.id ?? skill.name}
                                        className="px-3 py-1 bg-button-secondary-bg text-text-secondary border border-border rounded-full text-sm font-medium"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ContentCard>
        </>
    );
};
