import React, { useState } from "react";
import { ResumeListItemCard } from "../components/ResumeListItemCard";
import { useCreateResume, useGetAllResumes } from "../hooks/useResume";
import { useNavigate } from "react-router-dom";

export const ResumeListPage: React.FC = () => {
    const { data: resumes, isLoading } = useGetAllResumes();
    const navigate = useNavigate();
    const createResumeMutation = useCreateResume();

    const [newResumeName, setNewResumeName] = useState('');

    const sortedResumes = resumes?.slice().sort((a, b) => {
        if (a.isActive) return -1;
        if (b.isActive) return 1;
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createResumeMutation.mutate(newResumeName, {
            onSuccess: () => {
                setNewResumeName('');
            }
        });
    };

    const handleEdit = (resumeId: number) => {
        navigate(`/resume/edit/${resumeId}`);
    };

    if (isLoading) return <p>Loading resumes...</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleCreateSubmit} className="border p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-lg font-semibold mb-2">Create new resume</h2>
                <input
                    type="text"
                    placeholder="Resume name"
                    value={newResumeName}
                    onChange={(e) => setNewResumeName(e.target.value)}
                    className="border p-2 w-full mb-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Create
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {sortedResumes?.map((resume) => (
                    <ResumeListItemCard key={resume.id} resume={resume} onEdit={handleEdit} />
                ))}
            </div>
        </div>
    );
};