import React from "react";
import {ProjectItem} from "../types/projectTypes";
import {ContentCard} from "./ContentCard";
import {Button} from "./Button";

export interface ResumeCardProjectsProps {
    projects: ProjectItem[];
    onEditClick?: () => void;
}

export const ResumeCardProjects = ({ projects, onEditClick }: ResumeCardProjectsProps) => {
    return (
        <ContentCard>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Projects</h2>
                {onEditClick && (
                    <Button
                        type="secondary"
                        onClick={onEditClick}
                        className="px-3 py-1"
                    >
                        Edit
                    </Button>
                )}
            </div>
            <div className="flex flex-col gap-4">
                {projects.map((item) => (
                    <div key={item.id}>
                        <div className="flex items-center space-x-2">
                            <div className="font-semibold text-lg">{item.title}</div>
                            <div className="font-semibold text-lg">({item.subTitle})</div>
                        </div>
                        <div>
                            {item.description}
                        </div>
                    </div>
                ))}
            </div>
        </ContentCard>
    );
}