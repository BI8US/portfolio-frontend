import React from "react";
import {useGetActiveResume} from "../hooks/useResume";
import {ResumeCardHeader} from "../components/resume/ResumeCardHeader";
import {ResumeCardEducations} from "../components/resume/ResumeCardEducations";
import {ResumeCardWorkExperiences} from "../components/resume/ResumeCardWorkExperiences";
import {ResumeCardProjects} from "../components/resume/ResumeCardProjects";
import {ResumeCardSkills} from "../components/resume/ResumeCardSkills";
import {ContentPage} from "../components/common/ContentPage";
import {StatusMessage} from "../components/common/StatusMessage";

export default function ActiveResumePage() {
    const {data: activeResume, isLoading, isError} = useGetActiveResume();

    if (isLoading) {return (<StatusMessage message="Loading resume..." />);}
    if (isError) {return (<StatusMessage message="An error occurred while getting the resume." />);}
    if (!activeResume) {return (<StatusMessage message={`Active resume not found`} />);}

    const {educations, projects, skills, workExperiences} = activeResume;

    console.log("active resume", activeResume);

    return (
        <ContentPage className='max-w-4xl'>
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