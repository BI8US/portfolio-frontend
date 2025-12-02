import React from 'react';

import { EducationItem } from '../../types/educationTypes';
import { Button } from '../common/Button';
import { ContentCard } from '../common/ContentCard';
import { MarkdownText } from '../common/MarkdownText';

export interface ResumeCardEducationsProps {
    educations: EducationItem[];
    onEditClick?: () => void;
}

export const ResumeCardEducations = ({ educations, onEditClick }: ResumeCardEducationsProps) => {
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-primary text-2xl">
                        school
                    </span>
                    <h2 className="text-2xl font-bold text-text-primary">Education</h2>
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
                    {educations.map((item) => (
                        <div key={item.id}>
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 font-semibold text-lg text-text-primary">
                                <div>{item.school}</div>
                                <span className="hidden md:inline">|</span>
                                <div>{item.educationName}</div>
                            </div>
                            <p className="font-semibold mt-1 text-text-secondary">
                                {item.startDate} - {item.endDate ? item.endDate : 'Present'}
                            </p>
                            <MarkdownText className="text-text-secondary">
                                {item.description || ''}
                            </MarkdownText>
                        </div>
                    ))}
                </div>
            </ContentCard>
        </>
    );
};
