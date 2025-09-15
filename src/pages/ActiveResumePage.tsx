import React from "react";
import {useGetActiveResume} from "../hooks/useResume";
import {ResumeCardHeader} from "../components/ResumeCardHeader";
import {ResumeCardEducations} from "../components/ResumeCardEducations";
import {ResumeCardWorkExperiences} from "../components/ResumeCardWorkExperiences";
import {ResumeCardProjects} from "../components/ResumeCardProjects";
import {ResumeCardSkills} from "../components/ResumeCardSkills";
import {ContentPage} from "../components/ContentPage";

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
        <ContentPage>
            <ResumeCardHeader resume={activeResume} />

            {skills && skills.length > 0 && (
                <ResumeCardSkills skills={skills} />
            )}

            {educations && educations.length > 0 && (
                <ResumeCardEducations educations={educations} />
            )}

            {projects && projects.length > 0 && (
                <ResumeCardProjects projects={projects} />
            )}

            {workExperiences && workExperiences.length > 0 && (
                <ResumeCardWorkExperiences workExperiences={workExperiences} />
            )}
        </ContentPage>
    );
}