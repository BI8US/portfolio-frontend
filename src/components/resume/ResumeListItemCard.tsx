import React from 'react';

import { STATUS_COLORS } from '../../constants/statusColors';
import { ResumeListItem } from '../../types/resume';
import { Button } from '../common/Button';

interface ResumeCardProps {
    resume: ResumeListItem;
    onEdit: (resumeId: number) => void;
    onDelete: (resumeId: number) => void;
}

export const ResumeListItemCard: React.FC<ResumeCardProps> = ({ resume, onEdit, onDelete }) => {
    const statusKey = resume.isActive ? 'ACTIVE' : 'INACTIVE';
    const colorSet = STATUS_COLORS[statusKey] || { bg: 'bg-page', text: 'text-text-secondary' };
    const statusColorClasses = `${colorSet.bg} ${colorSet.text}`;

    return (
        <div className="border border-border rounded-3xl shadow-md p-4 flex flex-col justify-between bg-content">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <h3
                        className="text-xl font-bold text-text-primary truncate pr-2"
                        title={resume.resumeName}
                    >
                        {resume.resumeName}
                    </h3>
                    <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColorClasses}`}
                    >
                        {resume.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs text-text-muted">
                        <span className="font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">
                                calendar_add_on
                            </span>
                            Created:
                        </span>
                        <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-text-muted">
                        <span className="font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">history</span>
                            Updated:
                        </span>
                        <span>{new Date(resume.updatedAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <Button
                    type="secondary"
                    onClick={() => onEdit(resume.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2"
                >
                    <span className="material-symbols-outlined text-lg">visibility</span>
                    <span>View</span>
                </Button>
                <Button
                    type="danger"
                    onClick={() => onDelete(resume.id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 border-transparent"
                >
                    <span className="material-symbols-outlined text-lg">delete</span>
                    <span>Delete</span>
                </Button>
            </div>
        </div>
    );
};
