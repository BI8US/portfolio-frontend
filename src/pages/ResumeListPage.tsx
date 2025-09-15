import React, {useState} from "react";
import {ResumeListItemCard} from "../components/ResumeListItemCard";
import {useCreateResume, useGetAllResumes, useDeleteResume} from "../hooks/useResume";
import {useNavigate} from "react-router-dom";
import {ContentPage} from "../components/ContentPage";
import {ContentCard} from "../components/ContentCard";
import Button from "../components/Button";

export const ResumeListPage: React.FC = () => {
    const { data: resumes, isLoading } = useGetAllResumes();
    const navigate = useNavigate();
    const createResumeMutation = useCreateResume();
    const deleteResumeMutation = useDeleteResume();

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

    const handleDelete = (resumeId: number) => {
        deleteResumeMutation.mutate(resumeId);
    };

    if (isLoading) return <p>Loading resumes...</p>;

    return (
        <ContentPage>
            <ContentCard>
                <form onSubmit={handleCreateSubmit}>
                    <h2 className="text-lg font-semibold mb-2">Create new resume</h2>
                    <input
                        type="text"
                        placeholder="Resume name"
                        value={newResumeName}
                        onChange={(e) => setNewResumeName(e.target.value)}
                        className="border p-2 w-full mb-2 rounded"
                        required
                    />
                    <Button type={"primary"}>
                        Create
                    </Button>
                </form>
            </ContentCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {sortedResumes?.map((resume) => (
                    <ResumeListItemCard key={resume.id} resume={resume} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
            </div>
        </ContentPage>
    );
};