import React from "react";
import {ResumeListItem} from "../types/resumeTypes";
import Button from "./Button";

interface ResumeCardProps {
    resume: ResumeListItem;
    onEdit: (resumeId: number) => void;
    onDelete: (resumeId: number) => void;
}

export const ResumeListItemCard: React.FC<ResumeCardProps> = ({ resume, onEdit, onDelete }) => {
    return (
        <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between bg-white">
            <div>
                <h3 className="text-lg font-semibold mb-2">{resume.resumeName}</h3>
                <p className="mb-2">
                    <span
                        className={`px-3 py-1 rounded-full text-sm mb-8 font-semibold ${
                            resume.isActive ? "bg-green-200 text-green-800" : "bg-gray-300 text-gray-600"
                        }`}
                    >
                        {resume.isActive ? "Active" : "Inactive"}
                    </span>
                </p>
                <p className="text-sm mb-1">
                    <span className="font-medium">Created:</span>{" "}
                    {resume.createdAt ? new Date(resume.createdAt).toLocaleString() : "-"}
                </p>
                <p className="text-sm mb-1">
                    <span className="font-medium">Last updated:</span>{" "}
                    {resume.updatedAt ? new Date(resume.updatedAt).toLocaleString() : "-"}
                </p>
            </div>
            <div className="flex gap-2 mt-4">
                <Button
                    type="danger"
                    onClick={() => onDelete(resume.id)}
                    className="flex-1"
                >
                    Delete
                </Button>
                <Button
                    type="secondary"
                    onClick={() => onEdit(resume.id)}
                    className="flex-1"
                >
                    Edit
                </Button>
            </div>
        </div>
    );
};
