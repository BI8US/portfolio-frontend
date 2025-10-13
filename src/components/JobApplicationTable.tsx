import React from "react";
import {JobApplicationItem} from "../types/jobApplicationTypes";
import {JOB_APPLICATION_STATUSES } from "../constants/jobApplicationStatuses";
import {JOB_APPLICATION_STATUS_COLORS} from "../constants/statusColors";
import {Select} from "./Select"

const DEFAULT_COLORS = { bg: "bg-white", text: "text-gray-800" };

const statusOptions = JOB_APPLICATION_STATUSES.map(status => ({
    label: status,
    value: status,
}));

type SortKey = 'company' | 'role' | 'status' | 'updatedAt' | 'createdAt';
type SortDirection = 'asc' | 'desc';

interface JobApplicationTableProps {
    applications: JobApplicationItem[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onChangeStatus: (id: number, newStatus: string) => void;
    onSort: (key: SortKey) => void;
    sortConfig: { key: SortKey, direction: SortDirection } | null;
}

const SortIcon: React.FC<{ direction: SortDirection | null }> = ({ direction }) => {
    if (!direction) {
        return <svg className="w-3 h-3 text-gray-400 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L17 7H7L12 2Z M17 17L12 22L7 17H17Z" /></svg>; // Две стрелки (неактивная)
    }

    const d = direction === 'asc' ? "M7 14l5-5 5 5H7z" : "M7 10l5 5 5-5H7z";

    return (
        <svg className="w-3 h-3 text-gray-700 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d={d} />
        </svg>
    );
};

const SortableHeader: React.FC<{
    label: string;
    sortKey: SortKey;
    onSort: (key: SortKey) => void;
    sortConfig: JobApplicationTableProps['sortConfig'];
}> = ({ label, sortKey, onSort, sortConfig }) => {

    const isCurrent = sortConfig?.key === sortKey;
    const direction = isCurrent ? sortConfig.direction : null;

    return (
        <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-800 transition-colors duration-150"
            onClick={() => onSort(sortKey)}
        >
            <div className="flex items-center">
                {label}
                <SortIcon direction={direction} />
            </div>
        </th>
    );
};

export const JobApplicationTable: React.FC<JobApplicationTableProps> = ({
                                                                     applications,
                                                                     onEdit,
                                                                     onDelete,
                                                                     onChangeStatus,
                                                                     onSort,
                                                                     sortConfig,
                                                                 }) => {
    return (
        <div className="mt-6 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <SortableHeader label="Company" sortKey="company" onSort={onSort} sortConfig={sortConfig} />
                    <SortableHeader label="Role" sortKey="role" onSort={onSort} sortConfig={sortConfig} />
                    <SortableHeader label="Status" sortKey="status" onSort={onSort} sortConfig={sortConfig} />
                    <SortableHeader label="Last Updated" sortKey="updatedAt" onSort={onSort} sortConfig={sortConfig} />
                    <SortableHeader label="Created" sortKey="createdAt" onSort={onSort} sortConfig={sortConfig} />

                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {applications.length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                            No job applications found.
                        </td>
                    </tr>
                ) : (
                    applications.map((application) => {
                        const colorSet = JOB_APPLICATION_STATUS_COLORS[application.status as keyof typeof JOB_APPLICATION_STATUS_COLORS] || DEFAULT_COLORS;
                        const statusColorClasses = `${colorSet.bg} ${colorSet.text} border-transparent`;
                        return (
                            <tr key={application.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {application.company}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {application.role}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="w-40">
                                        <Select
                                            name={`status-${application.id}`}
                                            placeholder="Change Status"
                                            options={statusOptions}
                                            value={application.status}
                                            onChange={(newStatus) => onChangeStatus(application.id, newStatus)}
                                            className="!mb-0"
                                            buttonClassName={statusColorClasses}
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(application.updatedAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(application.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button
                                        onClick={() => onEdit(application.id)}
                                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(application.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )})
                )}
                </tbody>
            </table>
        </div>
    );
};