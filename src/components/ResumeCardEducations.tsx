import React from "react";
import {EducationItem} from "../types/educationTypes";
import {ContentCard} from "./ContentCard";

export interface ResumeCardEducationsProps {
    educations: EducationItem[];
}

export const ResumeCardEducations = ({ educations }: ResumeCardEducationsProps) => {
    return (
        <ContentCard>
            <h2 className="text-2xl font-bold mb-4">Education</h2>
            <div className="flex flex-col gap-4">
                {educations.map((item) => (
                    <div key={item.id}>
                        <div className="flex items-center space-x-2">
                            <div className="font-semibold text-lg">{item.school}</div>
                            <span className="font-semibold text-lg">|</span>
                            <div className="font-semibold text-lg">{item.educationName}</div>
                        </div>
                        <p className="font-semibold mt-1">
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