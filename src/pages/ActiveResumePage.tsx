import React from "react";
import {useGetActiveResume} from "../hooks/useResume";
import {ResumeCardHeader} from "../components/ResumeCardHeader";
import {ResumeCardEducations} from "../components/ResumeCardEducations";
import {ResumeCardWorkExperiences} from "../components/ResumeCardWorkExperiences";
import {ResumeCardProjects} from "../components/ResumeCardProjects";
import {ResumeCardSkills} from "../components/ResumeCardSkills";

export default function ActiveResumePage() {
    const {data: activeResume, isLoading, error} = useGetActiveResume();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Loading error</p>;
    }

    if (!activeResume) {
        return <p>No active resume found.</p>;
    }

    const {educations, mediaLinks, projects, skills, workExperiences} = activeResume;

    return (
        <div className="max-w-2xl mx-auto p-4">

            <ResumeCardHeader resume={activeResume} />

            {educations && educations.length > 0 && (
                <div className="mt-8">
                    <ResumeCardEducations educations={educations} />
                </div>
            )}

            {workExperiences && workExperiences.length > 0 && (
                <div className="mt-8">
                    <ResumeCardWorkExperiences workExperiences={workExperiences} />
                </div>
            )}

            {projects && projects.length > 0 && (
                <div className="mt-8">
                    <ResumeCardProjects projects={projects} />
                </div>
            )}

            {skills && skills.length > 0 && (
                <div className="mt-8">
                    <ResumeCardSkills skills={skills} />
                </div>
            )}
        </div>
    );
}