import React from "react";
import {JobApplicationItem} from "../types/jobApplicationTypes";
import {Button} from "./Button";
import {Select} from "./Select";
import {JOB_APPLICATION_STATUS_COLORS} from "../constants/statusColors"
import {JOB_APPLICATION_STATUSES} from "../constants/jobApplicationStatuses"

interface JobApplicationCardProps {
    application: JobApplicationItem
    onEdit: (applicationId: number) => void;
    onDelete: (applicationId: number) => void;
    onChangeStatus: (applicationId: number, newStatus: string) => void;
}

export const JobApplicationListItemCard: React.FC<JobApplicationCardProps> = ({application, onEdit, onDelete, onChangeStatus}) => {
    const statusColors = JOB_APPLICATION_STATUS_COLORS[application.status];
    const statusOptions = JOB_APPLICATION_STATUSES.map(status => ({
        label: status,
        value: status,
    }));

    const [newStatus, setNewStatus] = React.useState(application.status);

    const handleStatusUpdate = () => {
        onChangeStatus(application.id, newStatus);
    };

    return (
        <div className="border rounded-xl shadow-md p-4 flex flex-col justify-between bg-white">
            <div>
                <h3 className="text-lg font-semibold mb-2">{application.company}</h3>
                <h3 className="text-lg font-semibold mb-2">{application.role}</h3>
                <p className="mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors.bg} ${statusColors.text}`}>
                        {application.status}
                    </span>
                </p>
                <div className="flex gap-2 mb-2 items-start">
                    <Select
                        name="status"
                        options={statusOptions}
                        value={newStatus}
                        onChange={(value) => setNewStatus(value)}
                        className="basis-1/2"
                    />
                    <Button
                        type="secondary"
                        onClick={handleStatusUpdate}
                        className="flex-shrink-0"
                    >
                        ✓
                    </Button>
                </div>
                <p className="text-sm mb-1">
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(application.createdAt).toLocaleString()}
                </p>
                <p className="text-sm mb-1">
                    <span className="font-medium">Last updated:</span>{" "}
                    {new Date(application.updatedAt).toLocaleString()}
                </p>
            </div>
            <div className="flex gap-2 mt-4">
                <Button
                    type="secondary"
                    onClick={() => onEdit(application.id)}
                    className="flex-1"
                >
                    View
                </Button>
                <Button
                    type="danger"
                    onClick={() => onDelete(application.id)}
                    className="flex-1"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};
