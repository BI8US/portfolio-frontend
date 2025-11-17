import React from "react";
import {
    useCreateApplication,
    useDeleteApplication,
    useGetAllApplications,
    useUpdateApplication
} from "../hooks/useJobApplication";
import {useNavigate} from "react-router-dom";
import {ContentPage} from "../components/common/ContentPage"
import {ContentCard} from "../components/common/ContentCard";
import {JobApplicationItemPartial} from "../types/jobApplicationTypes"
import {Input} from "../components/common/Input";
import {Select} from "../components/common/Select";
import {Button} from "../components/common/Button";
import {STATUSES} from "../constants/Statuses";
import {ResumeListItemCard} from "../components/resume/ResumeListItemCard";
import {ConfirmationModal} from "../components/common/ConfirmationModal";
import {JobApplicationTable} from "../components/jobApplication/JobApplicationTable";
import {toast} from "sonner";

type SortKey = 'company' | 'role' | 'status' | 'updatedAt' | 'createdAt';
type SortDirection = 'asc' | 'desc';

export const JobApplicationListPage: React.FC = () => {
    const {data: applications, isLoading} = useGetAllApplications();
    const navigate = useNavigate();
    const createApplicationMutation = useCreateApplication();
    const deleteApplicationMutation = useDeleteApplication();
    const updateApplicationMutation = useUpdateApplication();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [applicationToDeleteId, setApplicationToDeleteId] = React.useState<number | null>(null);

    const [sortConfig, setSortConfig] = React.useState<{ key: SortKey, direction: SortDirection } | null>({
        key: 'updatedAt',
        direction: 'desc'
    });

    const [newApplication, setNewApplication] = React.useState<JobApplicationItemPartial>({
        status: "",
        company: "",
        role: "",
    });

    const statusOptions = STATUSES.map(status => ({
        label: status,
        value: status,
    }));

    const handleSort = (key: SortKey) => {
        let direction: SortDirection = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };


    const sortedApplications = React.useMemo(() => {
        if (!applications) return [];

        const sortableItems = [...applications];

        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key] ?? '';
                const bValue = b[sortConfig.key] ?? '';

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    const result = aValue.localeCompare(bValue);
                    return sortConfig.direction === 'asc' ? result : -result;
                }

                const aTime = new Date(aValue).getTime();
                const bTime = new Date(bValue).getTime();

                if (aTime < bTime) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aTime > bTime) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [applications, sortConfig]);


    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newApplication.status || !newApplication.company || !newApplication.role) {
            toast.error("Fill all fields for new application.");
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
        <ContentPage className="max-w-6xl">
            <ContentCard>
                <form onSubmit={handleCreateSubmit}>
                    <h2 className="text-lg font-semibold mb-2 text-text-primary">Add job application</h2>
                    <Select
                        name="status"
                        placeholder="Status"
                        options={statusOptions}
                        value={newApplication.status}
                        onChange={handleSelectChange}
                    />
                    <Input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={newApplication.company}
                        onChange={handleInputChange}
                    />
                    <Input
                        type="text"
                        name="role"
                        placeholder="Role"
                        value={newApplication.role}
                        onChange={handleInputChange}
                    />
                    <Button type={"primary"}>
                        Create
                    </Button>
                </form>
            </ContentCard>
            {applications && applications.length > 0 && (
                <JobApplicationTable
                    applications={sortedApplications}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onChangeStatus={handleChangeStatus}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                />
            )}

            {applications && applications.length === 0 && (
                <div className="mt-6 text-center text-gray-500 p-4 border rounded-3xl bg-white">
                    You haven't added any job applications yet.
                </div>
            )}

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