import React from "react";
import {useParams} from "react-router-dom";
import {
    useGetResumeById, useUpdateHeaderWithMediaLinks, useUpdateHeader, useUpdateMediaLinks, useUpdateSkills,
    useUpdateWorkExperiences, useUpdateProjects
} from "../hooks/useResume";
import {Payload, ResumeEditHeaderModal} from "../components/ResumeEditHeaderModal";
import {ResumeEditSkillsModal} from "../components/ResumeEditSkillsModal";
import {ContentPage} from "../components/ContentPage";
import {ResumeCardHeader} from "../components/ResumeCardHeader";
import {ResumeCardSkills} from "../components/ResumeCardSkills";
import {ResumeCardEducations} from "../components/ResumeCardEducations";
import {ResumeCardProjects} from "../components/ResumeCardProjects";
import {ResumeCardWorkExperiences} from "../components/ResumeCardWorkExperiences";
import {StatusMessage} from "../components/StatusMessage";
import {SkillItemPartial} from "../types/skillTypes";
import {EducationItemPartial} from "../types/educationTypes"
import {ResumeEditEducationsModal} from "../components/ResumeEditEducationsModal";
import {useUpdateEducations} from "../hooks/useResume";
import {ResumeEditWorkExperiencesModal} from "../components/ResumeEditWorkExperienceModal";
import {WorkExperienceItemPartial} from "../types/workExperienceTypes";
import {ResumeEditProjectsModal} from "../components/ResumeEditProjectsModal";
import {ProjectItemPartial} from "../types/projectTypes";

export const ResumeEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [activeModal, setActiveModal] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [activeModal]);

    const { data: resume, isLoading, isError } = useGetResumeById(Number(id));
    const updateHeaderWithMediaLinksMutation = useUpdateHeaderWithMediaLinks();
    const updateSkillsMutation = useUpdateSkills();
    const updateEducationsMutation = useUpdateEducations();
    const updateProjectsMutation = useUpdateProjects();
    const updateWorkExperiencesMutation = useUpdateWorkExperiences();

    if (isLoading) {return (<StatusMessage message="Loading resume..." />);}
    if (isError) {return (<StatusMessage message="An error occurred while fetching the resume." />);}
    if (!resume) {return (<StatusMessage message={`Resume with id ${id} not found`} />);}

    const {educations, projects, skills, workExperiences} = resume;

    const handleHeaderSubmit = async (payload: Payload) => {
        updateHeaderWithMediaLinksMutation.mutate(
            {
                id: Number(id),
                headerPartial: payload.header,
                mediaLinks: payload.mediaLinks,
            },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error("Failed to update header:", error);
                },
            }
        );
    };

    const handleSkillsSubmit = (skills: SkillItemPartial[]) => {
        updateSkillsMutation.mutate(
            { id: Number(id), skills },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error("Failed to update skills:", error);
                },
            }
        );
    };

    const handleEducationsSubmit = (educations: EducationItemPartial[]) => {
        updateEducationsMutation.mutate(
            { id: Number(id), educations },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error("Failed to update educations:", error);
                },
            }
        );
    };

    const handleProjectsSubmit = (projects: ProjectItemPartial[]) => {
        updateProjectsMutation.mutate(
            { id: Number(id), projects },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error("Failed to update projects:", error);
                },
            }
        )
    }

    const handleWorkExperiencesSubmit = (workExperiences: WorkExperienceItemPartial[]) => {
        updateWorkExperiencesMutation.mutate(
            { id: Number(id), workExperiences },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error("Failed to update workExperience:", error);
                },
            }
        )
    }

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
                <ResumeEditHeaderModal resumeItem={resume} onSubmit={handleHeaderSubmit} onCancel={handleCloseModal} />
            )}
            {activeModal === 'skills' && (
                <ResumeEditSkillsModal skills={skills ? skills : []} onSubmit={handleSkillsSubmit} onCancel={handleCloseModal} />
            )}
            {activeModal === 'educations' && (<ResumeEditEducationsModal educations={educations ? educations : []} onSubmit={handleEducationsSubmit} onCancel={handleCloseModal} />)}
            {activeModal === 'projects' && (<ResumeEditProjectsModal projects={projects ? projects : []} onSubmit={handleProjectsSubmit} onCancel={handleCloseModal} />)}
            {activeModal === 'workExperiences' && (<ResumeEditWorkExperiencesModal workExperiences={workExperiences ? workExperiences : []} onSubmit={handleWorkExperiencesSubmit} onCancel={handleCloseModal} />)}
        </ContentPage>
    );
};