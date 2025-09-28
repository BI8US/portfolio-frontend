import React from "react";
import {ResumeListItemCard} from "../components/ResumeListItemCard";
import {useCreateResume, useGetAllResumes, useDeleteResume} from "../hooks/useResume";
import {useNavigate} from "react-router-dom";
import {ContentPage} from "../components/ContentPage";
import {ContentCard} from "../components/ContentCard";
import {Button} from "../components/Button";
import {Input} from "../components/Input";
import {ConfirmationModal} from "../components/ConfirmationModal";

export const ResumeListPage: React.FC = () => {
    const { data: resumes, isLoading } = useGetAllResumes();
    const navigate = useNavigate();
    const createResumeMutation = useCreateResume();
    const deleteResumeMutation = useDeleteResume();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [resumeToDeleteId, setResumeToDeleteId] = React.useState<number | null>(null);

    const [newResumeName, setNewResumeName] = React.useState('');

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
        setResumeToDeleteId(resumeId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (resumeToDeleteId !== null) {
            deleteResumeMutation.mutate(resumeToDeleteId, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setResumeToDeleteId(null);
                },
            });
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setResumeToDeleteId(null);
    };

    if (isLoading) return <p>Loading resumes...</p>;

    return (
        <ContentPage className="max-w-4xl">
            <ContentCard>
                <form onSubmit={handleCreateSubmit}>
                    <h2 className="text-lg font-semibold mb-2">Create new resume</h2>
                    <Input
                        type="text"
                        placeholder="Resume name"
                        value={newResumeName}
                        onChange={(e) => setNewResumeName(e.target.value)}
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

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Delete resume"
                message="Are you sure you want to delete this resume? This action cannot be undone."
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </ContentPage>
    );
};