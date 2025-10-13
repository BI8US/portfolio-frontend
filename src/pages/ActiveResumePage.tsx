import React from "react";
import {useGetActiveResume} from "../hooks/useResume";
import {ResumeCardHeader} from "../components/ResumeCardHeader";
import {ResumeCardEducations} from "../components/ResumeCardEducations";
import {ResumeCardWorkExperiences} from "../components/ResumeCardWorkExperiences";
import {ResumeCardProjects} from "../components/ResumeCardProjects";
import {ResumeCardSkills} from "../components/ResumeCardSkills";
import {ContentPage} from "../components/ContentPage";
import {StatusMessage} from "../components/StatusMessage";

export default function ActiveResumePage() {
    const {data: activeResume, isLoading, isError} = useGetActiveResume();

    if (isLoading) {return (<StatusMessage message="Loading resume..." />);}
    if (isError) {return (<StatusMessage message="An error occurred while fetching the resume." />);}
    if (!activeResume) {return (<StatusMessage message={`Active resume not found`} />);}

    const {educations, projects, skills, workExperiences} = activeResume;

    console.log("active resume", activeResume);

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