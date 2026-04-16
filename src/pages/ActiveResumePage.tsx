import React from 'react';

import { ContentPage } from '../components/common/ContentPage';
import { StatusMessage } from '../components/common/StatusMessage';
import { ResumeCardEducations } from '../components/resume/view/ResumeCardEducations';
import { ResumeCardHeader } from '../components/resume/view/ResumeCardHeader';
import { ResumeCardProjects } from '../components/resume/view/ResumeCardProjects';
import { ResumeCardSkills } from '../components/resume/view/ResumeCardSkills';
import { ResumeCardWorkExperiences } from '../components/resume/view/ResumeCardWorkExperiences';
import { useGetActiveResume } from '../services/resume/hooks';

export default function ActiveResumePage() {
    const { data: activeResume, isLoading, isError } = useGetActiveResume();

    if (isLoading) {
        return <StatusMessage message="Loading..." />;
    }

    if (isError) {
        return <StatusMessage message="An error occurred while getting the resume." />;
    }

    if (!activeResume) {
        return <StatusMessage message="Active resume not found" />;
    }

    const { educations, projects, skillGroups, workExperiences } = activeResume;

    return (
        <ContentPage className="max-w-4xl">
            <ResumeCardHeader resume={activeResume} />

            {skillGroups && skillGroups.length > 0 && (
                <ResumeCardSkills skillGroups={skillGroups} />
            )}

            {workExperiences && workExperiences.length > 0 && (
                <ResumeCardWorkExperiences workExperiences={workExperiences} />
            )}

            {projects && projects.length > 0 && <ResumeCardProjects projects={projects} />}

            {educations && educations.length > 0 && (
                <ResumeCardEducations educations={educations} />
            )}
        </ContentPage>
    );
}
