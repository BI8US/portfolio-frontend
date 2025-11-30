import React from 'react';

import { WorkExperienceItem } from '../../types/workExperienceTypes';
import { Button } from '../common/Button';
import { ContentCard } from '../common/ContentCard';

export interface ResumeCardWorkExperiencesProps {
    workExperiences: WorkExperienceItem[];
    onEditClick?: () => void;
}

export const ResumeCardWorkExperiences = ({
    workExperiences,
    onEditClick,
}: ResumeCardWorkExperiencesProps) => {
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-primary text-2xl">
                        work
                    </span>
                    <h2 className="text-2xl font-bold text-text-primary">Work experience</h2>
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
                    {workExperiences.map((item) => (
                        <div key={item.id}>
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 font-semibold text-lg text-text-primary">
                                <div>{item.company}</div>
                                <span className="hidden md:inline">|</span>
                                <div>{item.position}</div>
                            </div>
                            <p className="font-semibold mt-2 text-text-secondary">
                                {item.startDate} - {item.endDate ? item.endDate : 'Present'}
                            </p>
                            {item.descriptionPoints && item.descriptionPoints.length > 0 && (
                                <ul className="list-disc list-inside mt-2 text-text-secondary">
                                    {item.descriptionPoints.map((point) => (
                                        <li key={point.id.toString()}>{point.descriptionPoint}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </ContentCard>
        </>
    );
};
