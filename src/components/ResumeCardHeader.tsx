import React from "react";
import {ResumeItem} from "../types/resumeTypes";
import {ResumeCardMediaLinks} from "./ResumeCardMediaLinks";
import {ContentCard} from "./ContentCard";
import {Button} from "./Button";

interface ResumeCardProps {
    resume: ResumeItem;
    onEditClick?: () => void;
}

export const ResumeCardHeader: React.FC<ResumeCardProps> = ({ resume, onEditClick }) => {
    return (
        <ContentCard>
            <div className="flex justify-between items-start w-full">
                {resume.picture && (
                    <img
                        src={resume.picture}
                        alt={resume.fullName}
                        className="w-28 h-28 object-cover rounded-full border-2 border-gray-300"
                    />
                )}

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-gray-800">{resume.fullName}</h2>
                        <span>
                            {onEditClick && (
                                <Button
                                    type="secondary"
                                    onClick={onEditClick}
                                    className="ml-4 px-3 py-1"
                                >
                                    Edit
                                </Button>
                            )}
                        </span>
                    </div>
                    {resume.mediaLinks && (
                        <ResumeCardMediaLinks mediaLinks={resume.mediaLinks}/>
                    )}
                    <div className="flex flex-wrap gap-4 text-gray-700 mb-2">
                        {resume.email && <p>Email: {resume.email}</p>}
                        {resume.phone && <p>Phone: {resume.phone}</p>}
                    </div>

                    {resume.summary && (
                        <p className="text-gray-600 whitespace-pre-line">{resume.summary}</p>
                    )}
                </div>
            </div>
        </ContentCard>
    );
};
