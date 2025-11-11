import React from "react";
import {useParams} from "react-router-dom";
import {useGetApplicationById, useUpdateApplication} from "../hooks/useJobApplication";
import {StatusMessage} from "../components/common/StatusMessage";
import {JobApplicationItemPartial} from "../types/jobApplicationTypes";
import {ContentPage} from "../components/common/ContentPage";
import {ContentCard} from "../components/common/ContentCard";
import {Button} from "../components/common/Button";
import {Select} from "../components/common/Select";
import {STATUS_COLORS} from "../constants/statusColors";
import {STATUSES} from "../constants/Statuses";
import {Input} from "../components/common/Input";
import {JobApplicationEditModal, ApplicationInfo} from "../components/jobApplication/JobApplicationEditModal"

export const JobApplicationEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const {data: application, isLoading, isError} = useGetApplicationById(Number(id));
    const updateApplicationMutation = useUpdateApplication();
    const [newStatus, setNewStatus] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    React.useEffect(() => {
        if (application) {
            setNewStatus(application.status);
            setNotes(application.notes || "");
        }
    }, [application]);

    React.useEffect(() => {
        if (isEditModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isEditModalOpen]);

    const statusColors = STATUS_COLORS[application?.status || ""];
    const statusOptions = STATUSES.map(status => ({
        label: status,
        value: status,
    }));

    const handleUpdateStatus = () => {
        updateApplicationMutation.mutate({
            id: Number(id),
            applicationData: { status: newStatus }
        });
    }

    const handleUpdateNotes = () => {
        updateApplicationMutation.mutate({
            id: Number(id),
            applicationData: { notes: notes },
        })
    }

    const handleUpdateInfo = (applicationInfo: ApplicationInfo) => {
        updateApplicationMutation.mutate(
            {id: Number(id), applicationData: applicationInfo }, {
                onSuccess: () => {
                    handleCloseModal();
                }
            }
        );
    }

    const handleOpenModal = () => {
        setIsEditModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
    }


    if (isLoading) {return (<StatusMessage message="Loading application..." />);}
    if (isError) {return (<StatusMessage message="An error occurred while fetching the application." />);}
    if (!application) {return (<StatusMessage message={`Application with id ${id} not found`} />);}

    return (
        <ContentPage className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-border rounded-3xl shadow-md p-4 flex flex-col bg-content">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-text-primary">Job info</h2>
                        <span>
                            <Button
                                type="secondary"
                                onClick={handleOpenModal}
                                className="px-3 py-1 border-transparent"
                            >
                            <span className="material-symbols-outlined text-2xl">edit</span>
                        </Button>
                        </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-text-primary">{application.company}</h3>
                    <h3 className="text-lg font-bold mb-2 text-text-primary">{application.role}</h3>
                    {application.link && (
                        <a
                            href={application.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold mb-2 break-words text-text-primary"
                        >
                            Link: {application.link}</a>
                    )}
                    {application.contact && (
                        <p className="font-semibold mb-2 text-text-primary">Contact: {application.contact}</p>
                    )}
                    {application.schedule && (
                        <p className="font-semibold mb-2 text-text-primary">Schedule: {application.schedule}</p>
                    )}
                    {application.description && (
                        <p className="text-text-secondary whitespace-pre-line">{application.description}</p>
                    )}
                </div>
                <div>
                    <div className="border border-border rounded-3xl shadow-md p-4 flex flex-col justify-between bg-content mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-text-primary">Status</h2>
                        <p className="mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors.bg} ${statusColors.text}`}>
                                {application.status}
                            </span>
                        </p>
                        <div className="flex gap-2 items-center">
                            <Select
                                name="status"
                                options={statusOptions}
                                value={newStatus}
                                onChange={(value) => setNewStatus(value)}
                                className="basis-1/2"
                            />
                            <Button
                                type="secondary"
                                onClick={handleUpdateStatus}
                                className="border-transparent mb-2"
                            >
                                <span className="material-symbols-outlined text-2xl">check</span>
                            </Button>
                        </div>
                    </div>
                    <div className="border border-border rounded-3xl shadow-md p-4 flex flex-col justify-between bg-content">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-text-primary">Notes</h2>
                        <Input
                            textarea
                            placeholder="Notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={handleUpdateNotes}
                        >
                            Save notes
                        </Button>
                    </div>
                </div>
            </div>
            <JobApplicationEditModal application={application} isOpen={isEditModalOpen} onSubmit={handleUpdateInfo} onCancel={handleCloseModal} />
        </ContentPage>
    )
}