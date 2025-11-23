import React from "react";
import {useGetActiveResume} from "../hooks/useResume";
import {ResumeCardHeader} from "../components/resume/ResumeCardHeader";
import {ResumeCardEducations} from "../components/resume/ResumeCardEducations";
import {ResumeCardWorkExperiences} from "../components/resume/ResumeCardWorkExperiences";
import {ResumeCardProjects} from "../components/resume/ResumeCardProjects";
import {ResumeCardSkills} from "../components/resume/ResumeCardSkills";
import {ContentPage} from "../components/common/ContentPage";
import {ContentCard} from "../components/common/ContentCard";
import {StatusMessage} from "../components/common/StatusMessage";
import {Snake} from "../components/games/Snake"
import {Button} from "../components/common/Button";

export default function ActiveResumePage() {
    const {data: activeResume, isLoading, isError} = useGetActiveResume();

    const [showGame, setShowGame] = React.useState(isLoading);

    React.useEffect(() => {
        if (isError) setShowGame(false);
    }, [isError]);

    if (showGame) {
        const isReady = !isLoading && activeResume;

        return (
            <ContentPage>
                <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">

                    <div className="text-center animate-fade-in">
                        {isReady ? (
                            <>
                                <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center justify-center gap-2">
                                    <span className="text-text-success text-4xl material-symbols-outlined">check_circle</span>
                                    Resume Ready!
                                </h1>
                                <p className="text-text-secondary mb-6 text-lg">
                                    Server is up and running. You can continue playing or view the resume.
                                </p>
                                <Button
                                    type="primary"
                                    onClick={() => setShowGame(false)}
                                    className="px-8 py-3 text-lg font-bold shadow-xl hover:scale-105 transition-transform"
                                >
                                    View Resume
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="text-center mb-6 max-w-lg">
                                    <h2 className="text-2xl font-bold text-text-primary mb-4 animate-pulse">
                                        Server is waking up...
                                    </h2>

                                    <p className="text-text-secondary text-lg leading-relaxed">
                                        The free tier server is performing a <span className="font-semibold text-text-primary">"Cold Start"</span>.
                                        <br />
                                        This usually takes about <span className="font-semibold text-text-primary">30-50 seconds</span>.
                                    </p>

                                    <p className="text-text-accent font-medium mt-4">
                                        Play Snake while you wait!
                                    </p>
                                </div>
                            </>
                        )}
                    </div>

                    <ContentCard className="w-auto flex justify-center py-8 shadow-2xl border-2 border-border-color">
                        <Snake />
                    </ContentCard>
                </div>
            </ContentPage>
        );
    }

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