import React from "react";
import { ResumeItem } from "../types/resumeTypes";

interface ResumeCardProps {
    resume: ResumeItem;
    onEdit: (resume: ResumeItem) => void;
}

export const ResumeListItemCard: React.FC<ResumeCardProps> = ({ resume, onEdit }) => {
    return (
        <div className="border rounded-lg shadow-md p-4 flex flex-col justify-between bg-white">
            <div>
                <h3 className="text-lg font-semibold mb-2">{resume.resumeName}</h3>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        resume.isActive ? "bg-green-100 text-green-800" : "bg-red-300 text-gray-600"
                    }`}
                >
                    {resume.isActive ? "Active" : "Inactive"}
                </span>
                <p className="text-sm mb-1">
                    <span className="font-medium">Created:</span>{" "}
                    {resume.createdAt ? new Date(resume.createdAt).toLocaleString() : "-"}
                </p>
                <p className="text-sm mb-1">
                    <span className="font-medium">Last updated:</span>{" "}
                    {resume.updatedAt ? new Date(resume.updatedAt).toLocaleString() : "-"}
                </p>
            </div>
            <button
                onClick={() => onEdit(resume)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
                Edit
            </button>
        </div>
    );
};
