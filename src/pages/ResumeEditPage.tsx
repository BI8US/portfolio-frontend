import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetResumeById, useUpdateResume } from "../hooks/useResume";
import { ResumeForm } from "../components/ResumeForm";
import { ResumeItemPartial } from "../types/resumeTypes";

export const ResumeEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: resume, isLoading } = useGetResumeById(Number(id));
    const updateResumeMutation = useUpdateResume();

    if (isLoading) return <p>Loading resume...</p>;
    if (!resume) return <p>Resume not found</p>;

    const handleSubmit = (partial: ResumeItemPartial) => {
        updateResumeMutation.mutate(
            { id: Number(id), partial },
            {
                onSuccess: () => navigate("/resumes"),
            }
        );
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <ResumeForm resumeEditItem={resume} onSubmit={handleSubmit} />
        </div>
    );
};
