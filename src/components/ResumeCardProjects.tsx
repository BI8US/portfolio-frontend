import React from "react";
import {ProjectItem} from "../types/projectTypes";
import {ContentCard} from "./ContentCard";

export interface ResumeCardProjectsProps {
    projects: ProjectItem[];
}

export const ResumeCardProjects = ({ projects }: ResumeCardProjectsProps) => {
    return (
        <ContentCard>
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
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