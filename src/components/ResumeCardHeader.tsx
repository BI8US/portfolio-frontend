import React from "react";
import {ResumeItem} from "../types/resumeTypes";
import {MediaLinkItem} from "../types/mediaLinkTypes";
import {ResumeCardMediaLinks} from "./ResumeCardMediaLinks";
import {ContentCard} from "./ContentCard";

interface ResumeCardProps {
    resume: ResumeItem;
}

export const ResumeCardHeader: React.FC<ResumeCardProps> = ({ resume }) => {
    return (
        <ContentCard>
            {resume.picture && (
                <img
                    src={resume.picture}
                    alt={resume.fullName}
                    className="w-28 h-28 object-cover rounded-full border-2 border-gray-300"
                />
            )}

            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{resume.fullName}</h2>
                    </div>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            resume.isActive ? "bg-green-300 text-white" : "bg-red-400 text-white"
                        }`}
                    >
                        {resume.isActive ? "Active" : "Inactive"}
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
        </ContentCard>
    );
};
