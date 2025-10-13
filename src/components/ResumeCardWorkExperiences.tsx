import React from "react";
import {WorkExperienceItem} from "../types/workExperienceTypes";
import {ContentCard} from "./ContentCard";
import {Button} from "./Button";

export interface ResumeCardWorkExperiencesProps {
    workExperiences: WorkExperienceItem[];
    onEditClick?: () => void;
}

export const ResumeCardWorkExperiences = ({ workExperiences, onEditClick }: ResumeCardWorkExperiencesProps) => {
    return (
        <ContentCard>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Work experience</h2>
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
                {workExperiences.map((item) => (
                    <div key={item.id}>
                        <div className="flex items-center space-x-2">
                            <div className="font-semibold text-lg">{item.company}</div>
                            <span className="font-semibold text-lg">|</span>
                            <div className="font-semibold text-lg">{item.position}</div>
                        </div>
                        <p className="font-semibold mt-2">
                            {item.startDate} - {item.endDate ? item.endDate : 'Present'}
                        </p>
                        {item.descriptionPoints && item.descriptionPoints.length > 0 && (
                            <ul className="list-disc list-inside mt-2">
                                {item.descriptionPoints.map((point) => (
                                    <li key={point.id.toString()}>{point.descriptionPoint}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </ContentCard>
    );
}