import React from 'react';

import { STATUS_COLORS } from '../../constants/statusColors';
import { STATUSES } from '../../constants/Statuses';
import { SortDirection } from '../../types/common';
import { JobApplicationListItem, JobApplicationSortField } from '../../types/jobApplication';
import { Select } from '../common/Select';

const DEFAULT_COLORS = { bg: 'bg-content', text: 'text-text-primary' };

const statusOptions = STATUSES.map((status) => ({
    label: status,
    value: status,
}));

interface JobApplicationTableProps {
    applications: JobApplicationListItem[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onChangeStatus: (id: number, newStatus: string) => void;
    onSort: (key: JobApplicationSortField) => void;
    sortConfig: { key: JobApplicationSortField; direction: SortDirection } | null;
}

const SortIcon: React.FC<{ direction: SortDirection | null }> = ({ direction }) => {
    if (!direction) {
        return (
            <span className="material-symbols-outlined text-sm text-text-muted ml-1">
                unfold_more
            </span>
        );
    }

    return (
        <span className="material-symbols-outlined text-sm text-text-secondary ml-1">
            {direction === 'asc' ? 'arrow_upward' : 'arrow_downward'}
        </span>
    );
};

const SortableHeader: React.FC<{
    label: string;
    sortKey: JobApplicationSortField;
    onSort: (key: JobApplicationSortField) => void;
    sortConfig: JobApplicationTableProps['sortConfig'];
}> = ({ label, sortKey, onSort, sortConfig }) => {
    const isCurrent = sortConfig?.key === sortKey;
    const direction = isCurrent ? sortConfig.direction : null;

    return (
        <th
            scope="col"
            className="px-6 py-4 text-left text-xs font-bold text-text-muted uppercase tracking-widest cursor-pointer hover:bg-page-hover transition-colors"
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
        <div className="mt-6 shadow-xl overflow-hidden border border-border rounded-3xl bg-content">
            <div className="overflow-x-auto">
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
                                label="Updated"
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
                            <th scope="col" className="px-6 py-4">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {applications.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-10 text-center text-text-muted italic"
                                >
                                    No job applications found.
                                </td>
                            </tr>
                        ) : (
                            applications.map((application) => {
                                const colorSet =
                                    STATUS_COLORS[
                                        application.status as keyof typeof STATUS_COLORS
                                    ] || DEFAULT_COLORS;
                                const statusColorClasses = `${colorSet.bg} ${colorSet.text} !border-transparent !shadow-none font-bold text-[10px] uppercase tracking-tighter`;

                                return (
                                    <tr
                                        key={application.id}
                                        className="hover:bg-page transition-colors group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-text-primary">
                                            {application.company}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                                            {application.role}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="w-36">
                                                <Select
                                                    name={`status-${application.id}`}
                                                    placeholder="Status"
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
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-text-muted">
                                            {new Date(application.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-text-muted">
                                            {new Date(application.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    type="button"
                                                    onClick={() => onEdit(application.id)}
                                                    className="p-1.5 flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-page-hover rounded-full transition-colors"
                                                    title="View/Edit"
                                                >
                                                    <span className="material-symbols-outlined text-xl leading-none">
                                                        visibility
                                                    </span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => onDelete(application.id)}
                                                    className="p-1.5 flex items-center justify-center text-text-muted hover:text-text-danger rounded-full"
                                                    title="Delete"
                                                >
                                                    <span className="material-symbols-outlined text-xl leading-none">
                                                        delete
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
