import React from "react";
import { ResumeListItemCard } from "../components/ResumeListItemCard";
import { ResumeForm } from "../components/ResumeForm";
import {useCreateResume, useGetAllResumes} from "../hooks/useResume";
import { useNavigate } from "react-router-dom";
import { ResumeItem } from "../types/resumeTypes";

export const ResumeListPage: React.FC = () => {
    const { data: resumes, isLoading } = useGetAllResumes();
    const navigate = useNavigate();
    const createResume = useCreateResume();

    const sortedResumes = resumes?.slice().sort((a, b) => {
        if (a.isActive) return -1;
        if (b.isActive) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    const handleEdit = (resume: ResumeItem) => {
        navigate(`/resume/edit/${resume.id}`);
    };

    if (isLoading) return <p>Loading resumes...</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <ResumeForm
                onSubmit={(data) =>
                    createResume.mutate(data)
                }
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {sortedResumes?.map((resume) => (
                    <ResumeListItemCard key={resume.id} resume={resume} onEdit={handleEdit} />
                ))}
            </div>
        </div>
    );
};
