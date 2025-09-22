import React from "react";
import {
    useCreateApplication,
    useDeleteApplication,
    useGetAllApplications,
    useUpdateApplication
} from "../hooks/useJobApplication";
import {useNavigate} from "react-router-dom";
import {ContentPage} from "../components/ContentPage"
import {ContentCard} from "../components/ContentCard";
import {JobApplicationItemPartial} from "../types/jobApplicationTypes"
import {Input} from "../components/Input";
import {Select} from "../components/Select";
import {Button} from "../components/Button";
import {JOB_APPLICATION_STATUSES} from "../constants/jobApplicationStatuses";
import {ResumeListItemCard} from "../components/ResumeListItemCard";
import {ConfirmationModal} from "../components/ConfirmationModal";
import {JobApplicationListItemCard} from "../components/JobApplicationListItemCard";

export const JobApplicationListPage: React.FC = () => {
    const {data: applications, isLoading} = useGetAllApplications();
    const navigate = useNavigate();
    const createApplicationMutation = useCreateApplication();
    const deleteApplicationMutation = useDeleteApplication();
    const updateApplicationMutation = useUpdateApplication();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [applicationToDeleteId, setApplicationToDeleteId] = React.useState<number | null>(null);

    const [newApplication, setNewApplication] = React.useState<JobApplicationItemPartial>({
        status: "",
        company: "",
        role: "",
    });

    const statusOptions = JOB_APPLICATION_STATUSES.map(status => ({
        label: status,
        value: status,
    }));

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO need other solution, maybe fully customizable form with own inputs
        if (!newApplication.status || !newApplication.company || !newApplication.role) {
            alert("Fill all fields for new application.");
            return;
        }
        createApplicationMutation.mutate(newApplication, {
            onSuccess: () => {
                setNewApplication({
                    status: "",
                    company: "",
                    role: "",
                });
            }
        });
    }

    const handleEdit = (applicationId: number) => {
        navigate(`/jobapplication/edit/${applicationId}`);
    };

    const handleChangeStatus = (applicationId: number, newStatus: string) => {
        updateApplicationMutation.mutate({
            id: applicationId,
            applicationData: { status: newStatus }
        });
    }

    const handleDelete = (applicationId: number) => {
        setApplicationToDeleteId(applicationId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (applicationToDeleteId !== null) {
            deleteApplicationMutation.mutate(applicationToDeleteId, {
                onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    setApplicationToDeleteId(null);
                },
            });
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setApplicationToDeleteId(null);
    };

    const handleSelectChange = (value: string) => {
        setNewApplication(prev => ({ ...prev, status: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewApplication(prev => ({ ...prev, [name]: value }));
    };

    if (isLoading) return <p>Loading job applications...</p>;

    return (
        <ContentPage>
            <ContentCard>
                <form onSubmit={handleCreateSubmit}>
                    <h2 className="text-lg font-semibold mb-2">Add job application</h2>
                    <Select
                        name="status"
                        placeholder="Status"
                        options={statusOptions}
                        value={newApplication.status}
                        onChange={handleSelectChange}
                        required
                    />
                    <Input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={newApplication.company}
                        onChange={handleInputChange}
                        required
                    />
                    <Input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={newApplication.role}
                        onChange={handleInputChange}
                        required
                    />
                    <Button type={"primary"}>
                        Create
                    </Button>
                </form>
            </ContentCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {applications?.map((application) => (
                    <JobApplicationListItemCard key={application.id} application={application} onEdit={handleEdit} onDelete={handleDelete} onChangeStatus={handleChangeStatus} />
                ))}
            </div>

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                title="Delete job application"
                message="Are you sure you want to delete this application? This action cannot be undone."
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
            />
        </ContentPage>
    )
}