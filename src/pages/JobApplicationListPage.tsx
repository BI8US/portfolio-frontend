import React from "react";
import {
    useCreateApplication,
    useDeleteApplication,
    useGetAllApplications,
    useUpdateApplicationStatus
} from "../hooks/useJobApplication";
import {useNavigate} from "react-router-dom";
import {ContentPage} from "../components/ContentPage"
import {ContentCard} from "../components/ContentCard";
import {JobApplicationItemPartial} from "../types/jobApplicationTypes"
import {Input} from "../components/Input";
import {Select} from "../components/Select";
import {Button} from "../components/Button";
import {JOB_APPLICATION_STATUSES} from "../constants/jobApplicationStatuses";

export const JobApplicationListPage: React.FC = () => {
    const {data: applications} = useGetAllApplications();
    const navigate = useNavigate();
    const createApplicationMutation = useCreateApplication();
    const deleteApplicationMutation = useDeleteApplication();
    const updateApplicationStatusMutation = useUpdateApplicationStatus();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
    const [applicationToDeleteId, setApplicationToDeleteId] = React.useState<number | null>(null);

    const [newApplication, setNewApplication] = React.useState<JobApplicationItemPartial>({
        status: "",
        company: "",
        role: "",
    });

    const statusOptions = JOB_APPLICATION_STATUSES.map(status => ({
        label: status.replace('_', ' ').toLowerCase(),
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

    const handleSelectChange = (value: string) => {
        setNewApplication(prev => ({ ...prev, status: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewApplication(prev => ({ ...prev, [name]: value }));
    };

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
        </ContentPage>
    )
}