import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {useGetResumeById, useUpdateHeader, useUpdateMediaLinks} from "../hooks/useResume";
import {Payload, ResumeEditHeaderModal} from "../components/ResumeEditHeaderModal";
import {ContentPage} from "../components/ContentPage";
import {ResumeCardHeader} from "../components/ResumeCardHeader";
import {ResumeCardSkills} from "../components/ResumeCardSkills";
import {ResumeCardEducations} from "../components/ResumeCardEducations";
import {ResumeCardProjects} from "../components/ResumeCardProjects";
import {ResumeCardWorkExperiences} from "../components/ResumeCardWorkExperiences";
import {StatusMessage} from "../components/StatusMessage";

export const ResumeEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [activeModal, setActiveModal] = useState<string | null>(null);

    const { data: resume, isLoading, isError } = useGetResumeById(Number(id));
    const updateHeaderMutation = useUpdateHeader();
    const updateMediaLinksMutation = useUpdateMediaLinks();

    if (isLoading) {return (<StatusMessage message="Loading resume..." />);}
    if (isError) {return (<StatusMessage message="An error occurred while fetching the resume." />);}
    if (!resume) {return (<StatusMessage message={`Resume with id ${id} not found`} />);}

    const {educations, projects, skills, workExperiences} = resume;

    const handleHeaderSubmit = async (payload: Payload) => {
        try {
            await Promise.all([
                updateHeaderMutation.mutateAsync({ id: Number(id), partial: payload.header }),
                updateMediaLinksMutation.mutateAsync({ id: Number(id), mediaLinks: payload.mediaLinks })
            ]);

            handleCloseModal();

        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

    const handleOpenModal = (modalName: string) => {
        setActiveModal(modalName);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
    };
    return (
        <ContentPage>
            <ResumeCardHeader resume={resume} onEditClick={() => handleOpenModal("header")} />
            <ResumeCardSkills skills={skills? skills : []} onEditClick={() => handleOpenModal("skills")} />
            <ResumeCardEducations educations={educations? educations : []} onEditClick={() => handleOpenModal("educations")} />
            <ResumeCardProjects projects={projects? projects : []} onEditClick={() => handleOpenModal("projects")} />
            <ResumeCardWorkExperiences workExperiences={workExperiences? workExperiences : []} onEditClick={() => handleOpenModal("workExperiences")} />

            {activeModal === 'header' && (
                <ResumeEditHeaderModal isOpen resumeItem={resume} onSubmit={handleHeaderSubmit} onCancel={handleCloseModal} />
            )}
            {activeModal === 'skills' && (<></>)}
            {activeModal === 'educations' && (<></>)}
            {activeModal === 'projects' && (<></>)}
            {activeModal === 'workExperiences' && (<></>)}
            {/*<ResumeEditHeaderModal resumeItem={resume} onSubmit={handleHeaderSubmit} />*/}
            {/*<ResumeEditMediaLinksModal mediaLinks={resume.mediaLinks} onSubmit={handleMediaLinksSubmit} />*/}
        </ContentPage>
    );
};