import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '../components/common/Button';
import { ContentPage } from '../components/common/ContentPage';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { StatusMessage } from '../components/common/StatusMessage';
import {
    ApplicationInfo,
    JobApplicationEditModal,
} from '../components/jobApplication/JobApplicationEditModal';
import { STATUS_COLORS } from '../constants/statusColors';
import { STATUSES } from '../constants/Statuses';
import { useGetApplicationById, useUpdateApplication } from '../services/jobs/hooks';
import { UpdateApplicationDto } from '../types/jobApplication';

export const JobApplicationEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const appId = Number(id);
    const { data: application, isLoading, isError } = useGetApplicationById(appId);
    const updateApplicationMutation = useUpdateApplication();

    const [newStatus, setNewStatus] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);

    React.useEffect(() => {
        if (application) {
            setNewStatus(application.status);
            setNotes(application.notes || '');
        }
    }, [application]);

    React.useEffect(() => {
        if (isEditModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isEditModalOpen]);

    const statusColors = STATUS_COLORS[application?.status || ''] || {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
    };
    const statusOptions = STATUSES.map((status) => ({
        label: status,
        value: status,
    }));

    const handleUpdateStatus = () => {
        const data: UpdateApplicationDto = { status: newStatus };
        updateApplicationMutation.mutate(
            {
                id: appId,
                applicationData: data,
            },
            {
                onSuccess: () => toast.success('Status updated'),
            },
        );
    };

    const handleUpdateNotes = () => {
        const data: UpdateApplicationDto = { notes: notes };
        updateApplicationMutation.mutate(
            {
                id: appId,
                applicationData: data,
            },
            {
                onSuccess: () => toast.success('Notes saved'),
            },
        );
    };

    const handleUpdateInfo = (applicationInfo: ApplicationInfo) => {
        updateApplicationMutation.mutate(
            { id: appId, applicationData: applicationInfo as UpdateApplicationDto },
            {
                onSuccess: () => {
                    toast.success('Job info updated');
                    handleCloseModal();
                },
            },
        );
    };

    const handleOpenModal = () => setIsEditModalOpen(true);
    const handleCloseModal = () => setIsEditModalOpen(false);

    if (isLoading) {
        return <StatusMessage message="Loading application..." />;
    }
    if (isError) {
        return <StatusMessage message="An error occurred while fetching the application." />;
    }
    if (!application) {
        return <StatusMessage message={`Application with id ${id} not found`} />;
    }

    return (
        <ContentPage className="max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border border-border rounded-3xl shadow-md p-6 flex flex-col bg-content">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-text-primary">Job info</h2>
                        <Button
                            type="secondary"
                            onClick={handleOpenModal}
                            className="px-3 py-1 border-transparent hover:bg-page"
                        >
                            <span className="material-symbols-outlined text-2xl">edit</span>
                        </Button>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-sm text-text-muted">Company</p>
                            <h3 className="text-lg font-bold text-text-primary">
                                {application.company}
                            </h3>
                        </div>
                        <div>
                            <p className="text-sm text-text-muted">Role</p>
                            <h3 className="text-lg font-bold text-text-primary">
                                {application.role}
                            </h3>
                        </div>

                        {application.link && (
                            <div>
                                <p className="text-sm text-text-muted">Job Link</p>
                                <a
                                    href={application.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold break-all hover:underline"
                                >
                                    {application.link}
                                </a>
                            </div>
                        )}

                        {application.contact && (
                            <div>
                                <p className="text-sm text-text-muted">Contact</p>
                                <p className="font-semibold text-text-primary">
                                    {application.contact}
                                </p>
                            </div>
                        )}

                        {application.schedule && (
                            <div>
                                <p className="text-sm text-text-muted">Schedule</p>
                                <p className="font-semibold text-text-primary">
                                    {application.schedule}
                                </p>
                            </div>
                        )}

                        {application.description && (
                            <div className="pt-2">
                                <p className="text-sm text-text-muted mb-1">Description</p>
                                <p className="text-text-secondary whitespace-pre-line text-sm leading-relaxed">
                                    {application.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="border border-border rounded-3xl shadow-md p-6 flex flex-col bg-content">
                        <h2 className="text-2xl font-bold mb-4 text-text-primary">Status</h2>
                        <div className="mb-4">
                            <span
                                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${statusColors.bg} ${statusColors.text}`}
                            >
                                {application.status}
                            </span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Select
                                name="status"
                                options={statusOptions}
                                value={newStatus}
                                onChange={(value) => setNewStatus(value)}
                                className="flex-1"
                            />
                            <Button
                                type="secondary"
                                onClick={handleUpdateStatus}
                                className="border-transparent"
                                title="Update Status"
                            >
                                <span className="material-symbols-outlined text-2xl">check</span>
                            </Button>
                        </div>
                    </div>

                    <div className="border border-border rounded-3xl shadow-md p-6 flex flex-col bg-content">
                        <h2 className="text-2xl font-bold mb-4 text-text-primary">Notes</h2>
                        <div className="mb-4">
                            <Input
                                textarea
                                placeholder="Write your notes here..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="min-h-[120px]"
                            />
                        </div>
                        <Button type="primary" onClick={handleUpdateNotes} className="w-full">
                            Save notes
                        </Button>
                    </div>
                </div>
            </div>

            <JobApplicationEditModal
                application={application as any}
                isOpen={isEditModalOpen}
                onSubmit={handleUpdateInfo}
                onCancel={handleCloseModal}
            />
        </ContentPage>
    );
};
