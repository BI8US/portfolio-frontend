import React from 'react';

import { STATUS_COLORS } from '../../constants/statusColors';
import { STATUSES } from '../../constants/Statuses';
import { JobApplicationItem } from '../../types/jobApplicationTypes';
import { Button } from '../common/Button';
import { Select } from '../common/Select';

const DEFAULT_COLORS = { bg: 'bg-content', text: 'text-text-primary' };

const statusOptions = STATUSES.map((status) => ({
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
    sortConfig: { key: SortKey; direction: SortDirection } | null;
}

const SortIcon: React.FC<{ direction: SortDirection | null }> = ({ direction }) => {
    if (!direction) {
        return (
            <svg className="w-3 h-3 text-text-muted ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L17 7H7L12 2Z M17 17L12 22L7 17H17Z" />
            </svg>
        );
    }

    const d = direction === 'asc' ? 'M7 14l5-5 5 5H7z' : 'M7 10l5 5 5-5H7z';

    return (
        <svg className="w-3 h-3 text-text-secondary ml-1" fill="currentColor" viewBox="0 0 24 24">
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
            className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors duration-150"
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
        <div className="mt-6 shadow-md overflow-hidden border border-border rounded-3xl overflow-x-auto">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-page">
                    <tr>
                        <SortableHeader
                            label="Company"
                            sortKey="company"
                            onSort={onSort}
                            sortConfig={sortConfig}
                        />
                        <SortableHeader
                            label="Role"
                            sortKey="role"
                            onSort={onSort}
                            sortConfig={sortConfig}
                        />
                        <SortableHeader
                            label="Status"
                            sortKey="status"
                            onSort={onSort}
                            sortConfig={sortConfig}
                        />
                        <SortableHeader
                            label="Last Updated"
                            sortKey="updatedAt"
                            onSort={onSort}
                            sortConfig={sortConfig}
                        />
                        <SortableHeader
                            label="Created"
                            sortKey="createdAt"
                            onSort={onSort}
                            sortConfig={sortConfig}
                        />

                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-content divide-y divide-border">
                    {applications.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-4 text-center text-text-muted">
                                No job applications found.
                            </td>
                        </tr>
                    ) : (
                        applications.map((application) => {
                            const colorSet =
                                STATUS_COLORS[application.status as keyof typeof STATUS_COLORS] ||
                                DEFAULT_COLORS;
                            const statusColorClasses = `${colorSet.bg} ${colorSet.text} border-transparent`;
                            return (
                                <tr key={application.id} className="hover:bg-page">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-text-primary">
                                        {application.company}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                        {application.role}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                        <div className="w-40">
                                            <Select
                                                name={`status-${application.id}`}
                                                placeholder="Change Status"
                                                options={statusOptions}
                                                value={application.status}
                                                onChange={(newStatus) =>
                                                    onChangeStatus(application.id, newStatus)
                                                }
                                                className="!mb-0"
                                                buttonClassName={statusColorClasses}
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                        {new Date(application.updatedAt).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                        {new Date(application.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Button
                                            type="secondary"
                                            onClick={() => onEdit(application.id)}
                                            className="px-3 py-1 border-transparent bg-transparent"
                                        >
                                            <span className="material-symbols-outlined text-2xl">
                                                edit
                                            </span>
                                        </Button>
                                        <Button
                                            type="danger"
                                            onClick={() => onDelete(application.id)}
                                            className="border-transparent bg-transparent"
                                        >
                                            <span className="material-symbols-outlined text-2xl">
                                                delete
                                            </span>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};
