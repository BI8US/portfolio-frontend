import React from "react";
import {WorkExperienceItem} from "../types/workExperienceTypes";
import {ContentCard} from "./ContentCard";

export interface ResumeCardWorkExperiencesProps {
    workExperiences: WorkExperienceItem[];
}

export const ResumeCardWorkExperiences = ({ workExperiences }: ResumeCardWorkExperiencesProps) => {
    return (
        <ContentCard>
            <h2 className="text-2xl font-bold mb-4">Work experience</h2>
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
                                {item.descriptionPoints.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </ContentCard>
    );
}