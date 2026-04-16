import React from 'react';
import { useParams } from 'react-router-dom';

import { ContentPage } from '../components/common/ContentPage';
import { StatusMessage } from '../components/common/StatusMessage';
import { ResumeEditEducationsModal } from '../components/resume/edit/ResumeEditEducationsModal';
import { ResumeEditHeaderModal } from '../components/resume/edit/ResumeEditHeaderModal';
import { ResumeEditProjectsModal } from '../components/resume/edit/ResumeEditProjectsModal';
import { ResumeEditSkillsModal } from '../components/resume/edit/ResumeEditSkillsModal';
import { ResumeEditWorkExperiencesModal } from '../components/resume/edit/ResumeEditWorkExperienceModal';
import { ResumeCardEducations } from '../components/resume/view/ResumeCardEducations';
import { ResumeCardHeader } from '../components/resume/view/ResumeCardHeader';
import { ResumeCardProjects } from '../components/resume/view/ResumeCardProjects';
import { ResumeCardSkills } from '../components/resume/view/ResumeCardSkills';
import { ResumeCardWorkExperiences } from '../components/resume/view/ResumeCardWorkExperiences';
import {
    useGetResumeById,
    useUpdateEducations,
    useUpdateHeader,
    useUpdateProjects,
    useUpdateSkillGroups,
    useUpdateWorkExperiences,
} from '../services/resume/hooks';
import {
    EducationItem,
    ProjectItem,
    SkillGroupItem,
    UpdateHeaderDto,
    WorkExperienceItem,
} from '../types/resume';

export const ResumeEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const resumeId = Number(id);

    const [activeModal, setActiveModal] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (activeModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [activeModal]);

    const { data: resume, isLoading, isError } = useGetResumeById(resumeId);

    const updateHeaderMutation = useUpdateHeader();
    const updateSkillGroupsMutation = useUpdateSkillGroups();
    const updateEducationsMutation = useUpdateEducations();
    const updateProjectsMutation = useUpdateProjects();
    const updateWorkExperiencesMutation = useUpdateWorkExperiences();

    if (isLoading) {
        return <StatusMessage message="Loading resume..." />;
    }
    if (isError) {
        return <StatusMessage message="An error occurred while fetching the resume." />;
    }
    if (!resume) {
        return <StatusMessage message={`Resume with id ${id} not found`} />;
    }

    const { educations, projects, skillGroups, workExperiences } = resume;

    const handleHeaderSubmit = async (payload: UpdateHeaderDto) => {
        updateHeaderMutation.mutate(
            {
                id: resumeId,
                payload: payload,
            },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error('Failed to update header:', error);
                },
            },
        );
    };

    const handleSkillGroupsSubmit = (skillGroups: SkillGroupItem[]) => {
        updateSkillGroupsMutation.mutate(
            { id: resumeId, skillGroups },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error('Failed to update skills:', error);
                },
            },
        );
    };

    const handleEducationsSubmit = (educations: EducationItem[]) => {
        updateEducationsMutation.mutate(
            { id: resumeId, educations },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error('Failed to update educations:', error);
                },
            },
        );
    };

    const handleProjectsSubmit = (projects: ProjectItem[]) => {
        updateProjectsMutation.mutate(
            { id: resumeId, projects },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error('Failed to update projects:', error);
                },
            },
        );
    };

    const handleWorkExperiencesSubmit = (workExperiences: WorkExperienceItem[]) => {
        updateWorkExperiencesMutation.mutate(
            { id: resumeId, workExperiences },
            {
                onSuccess: () => {
                    handleCloseModal();
                },
                onError: (error) => {
                    console.error('Failed to update workExperience:', error);
                },
            },
        );
    };

    const handleOpenModal = (modalName: string) => {
        setActiveModal(modalName);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
    };

    return (
        <ContentPage>
            <ResumeCardHeader resume={resume} onEditClick={() => handleOpenModal('header')} />

            <ResumeCardSkills
                skillGroups={skillGroups || []}
                onEditClick={() => handleOpenModal('skills')}
            />

            <ResumeCardWorkExperiences
                workExperiences={workExperiences || []}
                onEditClick={() => handleOpenModal('workExperiences')}
            />

            <ResumeCardProjects
                projects={projects || []}
                onEditClick={() => handleOpenModal('projects')}
            />

            <ResumeCardEducations
                educations={educations || []}
                onEditClick={() => handleOpenModal('educations')}
            />

            {activeModal === 'header' && (
                <ResumeEditHeaderModal
                    resumeItem={resume}
                    onSubmit={handleHeaderSubmit}
                    onCancel={handleCloseModal}
                />
            )}

            {activeModal === 'skills' && (
                <ResumeEditSkillsModal
                    initialGroups={skillGroups || []}
                    onSubmit={handleSkillGroupsSubmit}
                    onCancel={handleCloseModal}
                />
            )}

            {activeModal === 'workExperiences' && (
                <ResumeEditWorkExperiencesModal
                    initialWorkExperiences={workExperiences || []}
                    onSubmit={handleWorkExperiencesSubmit}
                    onCancel={handleCloseModal}
                />
            )}

            {activeModal === 'projects' && (
                <ResumeEditProjectsModal
                    initialProjects={projects || []}
                    onSubmit={handleProjectsSubmit}
                    onCancel={handleCloseModal}
                />
            )}

            {activeModal === 'educations' && (
                <ResumeEditEducationsModal
                    initialEducations={educations || []}
                    onSubmit={handleEducationsSubmit}
                    onCancel={handleCloseModal}
                />
            )}
        </ContentPage>
    );
};
