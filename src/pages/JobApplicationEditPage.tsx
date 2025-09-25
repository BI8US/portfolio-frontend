import React from "react";
import {useParams} from "react-router-dom";
import {useGetApplicationById, useUpdateApplication} from "../hooks/useJobApplication";
import {StatusMessage} from "../components/StatusMessage";
import {JobApplicationItemPartial} from "../types/jobApplicationTypes";
import {ContentPage} from "../components/ContentPage";
import {ContentCard} from "../components/ContentCard";
import {Button} from "../components/Button";
import {Select} from "../components/Select";
import {JOB_APPLICATION_STATUS_COLORS} from "../constants/statusColors";
import {JOB_APPLICATION_STATUSES} from "../constants/jobApplicationStatuses";
import {Input} from "../components/Input";
import {JobApplicationEditModal, ApplicationInfo} from "../components/JobApplicationEditModal"

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

    const statusColors = JOB_APPLICATION_STATUS_COLORS[application?.status || ""];
    const statusOptions = JOB_APPLICATION_STATUSES.map(status => ({
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
        <ContentPage>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-xl shadow-md p-4 flex flex-col bg-white">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-gray-800">Job info</h2>
                        <span>
                            <Button
                                type="secondary"
                                onClick={handleOpenModal}
                                className="ml-4 px-3 py-1"
                            >
                                Edit
                            </Button>
                        </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{application.company}</h3>
                    <h3 className="text-lg font-bold mb-2">{application.role}</h3>
                    {application.link && (
                        <a
                            href={application.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold mb-2 break-words"
                        >
                            Link: {application.link}</a>
                    )}
                    {application.contact && (
                        <p className="font-semibold mb-2">Contact: {application.contact}</p>
                    )}
                    {application.schedule && (
                        <p className="font-semibold mb-2">Schedule: {application.schedule}</p>
                    )}
                    {application.description && (
                        <p className="text-gray-600 whitespace-pre-line">{application.description}</p>
                    )}
                </div>
                <div>
                    <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between bg-white mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Status</h2>
                        <p className="mb-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors.bg} ${statusColors.text}`}>
                                {application.status}
                            </span>
                        </p>
                        <div className="flex gap-2 items-start">
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
                                className="flex-shrink-0"
                            >
                                ✓
                            </Button>
                        </div>
                    </div>
                    <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between bg-white">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Notes</h2>
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