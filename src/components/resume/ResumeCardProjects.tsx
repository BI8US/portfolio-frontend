import React from "react";
import {ProjectItem} from "../../types/projectTypes";
import {ContentCard} from "../common/ContentCard";
import {Button} from "../common/Button";

export interface ResumeCardProjectsProps {
    projects: ProjectItem[];
    onEditClick?: () => void;
}

export const ResumeCardProjects = ({ projects, onEditClick }: ResumeCardProjectsProps) => {
    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-primary text-2xl">rocket_launch</span>
                    <h2 className="text-2xl font-bold text-text-primary">Projects</h2>
                </div>
                {onEditClick && (
                    <Button
                        type="secondary"
                        onClick={onEditClick}
                        className="px-3 py-1 border-transparent bg-page"
                    >
                        <span className="material-symbols-outlined text-2xl">edit</span>
                    </Button>
                )}
            </div>
            <ContentCard>
                <div className="flex flex-col gap-4">
                    {projects.map((item) => (
                        <div key={item.id}>
                            <div className="flex items-center space-x-2 font-semibold text-lg text-text-primary">
                                <div>{item.title}</div>
                                <div>({item.subTitle})</div>
                            </div>
                            <div className="text-text-secondary">
                                {item.description}
                            </div>
                        </div>
                    ))}
                </div>
            </ContentCard>
        </>
    );
}