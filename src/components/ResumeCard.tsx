import React from "react";
import { ResumeItem } from "../types/resumeTypes";

interface ResumeCardProps {
    resume: ResumeItem;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({ resume }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 mb-6 flex gap-6 items-start max-w-2xl mx-auto">
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
                            resume.isActive ? "bg-green-100 text-green-800" : "bg-red-300 text-gray-600"
                        }`}
                    >
                        {resume.isActive ? "Active" : "Inactive"}
                    </span>
                </div>

                <div className="flex flex-wrap gap-4 text-gray-700 mb-2">
                    {resume.email && <p>Email: {resume.email}</p>}
                    {resume.phone && <p>Phone: {resume.phone}</p>}
                </div>

                {resume.summary && (
                    <p className="text-gray-600 whitespace-pre-line">{resume.summary}</p>
                )}
            </div>
        </div>
    );
};
