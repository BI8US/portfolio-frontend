import { PDFDownloadLink } from '@react-pdf/renderer';
import React from 'react';

import { Button } from '../components/common/Button';
import { ContentCard } from '../components/common/ContentCard';
import { ContentPage } from '../components/common/ContentPage';
import { StatusMessage } from '../components/common/StatusMessage';
import { Snake } from '../components/games/Snake';
import { ResumeCardEducations } from '../components/resume/ResumeCardEducations';
import { ResumeCardHeader } from '../components/resume/ResumeCardHeader';
import { ResumeCardProjects } from '../components/resume/ResumeCardProjects';
import { ResumeCardSkills } from '../components/resume/ResumeCardSkills';
import { ResumeCardWorkExperiences } from '../components/resume/ResumeCardWorkExperiences';
import { ResumePdf } from '../components/resume/ResumePdf';
import { useGetActiveResume } from '../hooks/useResume';

export default function ActiveResumePage() {
    const { data: activeResume, isLoading, isError } = useGetActiveResume();

    const [showGame, setShowGame] = React.useState(isLoading);

    React.useEffect(() => {
        if (isError) setShowGame(false);
    }, [isError]);

    if (showGame) {
        const isReady = !isLoading && activeResume;

        return (
            <ContentPage>
                <div className="flex flex-col items-center justify-center">
                    <div className="text-center">
                        {isReady ? (
                            <>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-text-success text-2xl">
                                        check_circle
                                    </span>
                                    <h2 className="text-2xl font-bold text-text-primary">
                                        Resume Ready!
                                    </h2>
                                </div>
                                <p className="text-text-secondary mb-2 text-lg">
                                    Server is up and running. You can continue playing or view the
                                    resume.
                                </p>
                                <Button
                                    type="primary"
                                    onClick={() => setShowGame(false)}
                                    className="mb-4"
                                >
                                    View Resume
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="text-center mb-2">
                                    <h2 className="text-2xl font-bold text-text-primary mb-2 animate-pulse">
                                        Server is waking up...
                                    </h2>
                                    <p className="text-text-secondary text-lg">
                                        This usually takes about{' '}
                                        <span className="font-semibold text-text-primary">
                                            30-50 seconds
                                        </span>
                                        .
                                    </p>

                                    <p className="text-text-accent font-semibold text-lg">
                                        Play Snake while you wait!
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    <ContentCard className="!w-fit !max-w-full">
                        <Snake />
                    </ContentCard>
                </div>
            </ContentPage>
        );
    }

    if (isError) {
        return <StatusMessage message="An error occurred while getting the resume." />;
    }
    if (!activeResume) {
        return <StatusMessage message={`Active resume not found`} />;
    }

    const { educations, projects, skills, workExperiences } = activeResume;

    console.log('active resume', activeResume);

    return (
        <ContentPage className="max-w-4xl">
            <div className="flex justify-end mb-4">
                <PDFDownloadLink
                    document={<ResumePdf resume={activeResume!} />}
                    fileName={`Resume_${(activeResume?.fullName || 'Candidate').replace(/\s+/g, '_')}.pdf`}
                >
                    {({ blob, url, loading, error }) => (
                        <Button
                            type="primary"
                            disabled={loading}
                            className="flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">download</span>
                            {loading ? 'Preparing PDF...' : 'Download PDF'}
                        </Button>
                    )}
                </PDFDownloadLink>
            </div>

            <ResumeCardHeader resume={activeResume} />

            {skills && skills.length > 0 && <ResumeCardSkills skills={skills} />}

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
