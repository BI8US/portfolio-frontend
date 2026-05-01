import React from 'react';

import { Button } from '../components/common/Button';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import { ContentCard } from '../components/common/ContentCard';
import { ContentPage } from '../components/common/ContentPage';
import { Input } from '../components/common/Input';
import { ActiveWorkoutBoard } from '../components/fitness/ActiveWorkoutBoard';
import { ProfileModal } from '../components/fitness/ProfileModal';
import { WorkoutHistoryCard } from '../components/fitness/WorkoutHistoryCard';
import {
    useCompleteWorkout,
    useCreateWorkoutPlan,
    useDeleteWorkout,
    useUpdateWorkoutProfile,
    useWorkoutProfile,
    useWorkouts,
} from '../services/workouts/hooks';
import type { UserProfile } from '../types/workout';

function isProfileFilled(profile?: UserProfile | null) {
    if (!profile) return false;
    return profile.weight > 0 && profile.height > 0 && profile.age > 0 && !!profile.goals?.trim();
}

export const FitnessPage: React.FC = () => {
    const { data: profile, isLoading: isProfileLoading } = useWorkoutProfile();
    const t = {
        title: 'AI Fitness Coach',
        subtitle: 'Planning, set tracking, and AI feedback.',
        myProfile: 'My profile',
        completeProfileTitle: 'Complete your profile',
        completeProfileBody: 'It helps the coach plan a safe and effective progression.',
        fillNow: 'Fill it in',
        currentPlanTitle: 'Current plan',
        currentPlanBody: 'If you have a planned workout, this is your “in-gym” mode.',
        loadingWorkouts: 'Loading workouts…',
        noPlannedWorkout: 'No planned workout yet. Create one below.',
        newWorkoutTitle: 'New workout',
        requestPlaceholder: 'What are we training today? Any constraints or preferences?',
        requestRequired: 'Please enter what you want to train today.',
        planningFailed: "Couldn't create a workout plan. Please try again.",
        planning: 'Planning…',
        planWorkout: 'Plan workout',
        profileRequired: 'To plan workouts, please complete your profile first.',
        historyTitle: 'History',
        historyBody: 'Completed workouts and AI notes.',
        loading: 'Loading…',
        emptyHistory: 'No workouts yet.',
        deleteWorkoutTitle: 'Delete workout',
        deleteWorkoutMessage: 'Delete this workout? This action cannot be undone.',
        cancel: 'Cancel',
        deleting: 'Deleting…',
        delete: 'Delete',
    };
    const { data: workouts, isLoading: isWorkoutsLoading } = useWorkouts();

    const updateProfileMutation = useUpdateWorkoutProfile();
    const createPlanMutation = useCreateWorkoutPlan();
    const completeMutation = useCompleteWorkout();
    const deleteWorkoutMutation = useDeleteWorkout();

    const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
    const [userRequest, setUserRequest] = React.useState('');
    const [requestError, setRequestError] = React.useState<string | null>(null);
    const [workoutIdToDelete, setWorkoutIdToDelete] = React.useState<string | null>(null);

    const sortedWorkouts = React.useMemo(() => {
        const list = workouts ? workouts.slice() : [];
        list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return list;
    }, [workouts]);

    const plannedWorkout = React.useMemo(() => {
        return sortedWorkouts.find((w) => w.status === 'PLANNED');
    }, [sortedWorkouts]);

    const completedWorkouts = React.useMemo(() => {
        return sortedWorkouts.filter((w) => w.status === 'COMPLETED');
    }, [sortedWorkouts]);

    return (
        <ContentPage className="max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h1 className="text-text-primary text-2xl font-bold">{t.title}</h1>
                    <p className="text-text-secondary mt-1">{t.subtitle}</p>
                </div>
                <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                    <Button
                        type="secondary"
                        htmlType="button"
                        onClick={() => setIsProfileModalOpen(true)}
                        className="w-full sm:w-auto"
                    >
                        {t.myProfile}
                    </Button>
                </div>
            </div>

            {!isProfileLoading && !isProfileFilled(profile) && (
                <ContentCard className="mt-4 p-4 md:p-6">
                    <div className="text-text-primary font-bold text-lg">
                        {t.completeProfileTitle}
                    </div>
                    <div className="text-text-secondary mt-1">{t.completeProfileBody}</div>
                    <div className="mt-3">
                        <Button
                            type="primary"
                            htmlType="button"
                            onClick={() => setIsProfileModalOpen(true)}
                        >
                            {t.fillNow}
                        </Button>
                    </div>
                </ContentCard>
            )}

            <div className="mt-4 space-y-4">
                <ContentCard className="p-4 md:p-6">
                    <div className="text-text-primary font-bold text-lg">{t.currentPlanTitle}</div>
                    <div className="text-text-secondary mt-1">{t.currentPlanBody}</div>

                    <div className="mt-4">
                        {isWorkoutsLoading ? (
                            <div className="text-text-secondary">{t.loadingWorkouts}</div>
                        ) : plannedWorkout ? (
                            <div className="mt-3">
                                <ActiveWorkoutBoard
                                    workoutId={plannedWorkout.id}
                                    plan={plannedWorkout.plannedData}
                                    isCompleting={completeMutation.isPending}
                                    onComplete={(actualData) =>
                                        completeMutation.mutate({
                                            workoutId: plannedWorkout.id,
                                            actualData,
                                        })
                                    }
                                />
                            </div>
                        ) : (
                            <div className="text-text-secondary">{t.noPlannedWorkout}</div>
                        )}
                    </div>
                </ContentCard>

                <ContentCard className="p-4 md:p-6">
                    <div className="text-text-primary font-bold text-lg">{t.newWorkoutTitle}</div>

                    <div className="mt-3">
                        <Input
                            placeholder={t.requestPlaceholder}
                            value={userRequest}
                            onChange={(e) => {
                                setUserRequest(e.target.value);
                                if (requestError) setRequestError(null);
                            }}
                            className="text-lg p-3"
                        />
                    </div>

                    <div className="mt-2 flex flex-col md:flex-row gap-2">
                        <Button
                            type="primary"
                            htmlType="button"
                            className="w-full text-lg py-3"
                            onClick={() => {
                                const trimmed = userRequest.trim();
                                if (!trimmed) {
                                    setRequestError(t.requestRequired);
                                    return;
                                }

                                createPlanMutation.mutate(trimmed, {
                                    onError: () => setRequestError(t.planningFailed),
                                });
                            }}
                            disabled={!isProfileFilled(profile) || createPlanMutation.isPending}
                        >
                            {createPlanMutation.isPending ? t.planning : t.planWorkout}
                        </Button>
                    </div>

                    {requestError && (
                        <div className="mt-3 text-text-danger text-sm font-semibold">
                            {requestError}
                        </div>
                    )}

                    {!isProfileFilled(profile) && (
                        <div className="mt-3 text-text-muted text-sm">{t.profileRequired}</div>
                    )}
                </ContentCard>

                <ContentCard className="p-4 md:p-6">
                    <div className="text-text-primary font-bold text-lg">{t.historyTitle}</div>
                    <div className="text-text-secondary mt-1">{t.historyBody}</div>

                    <div className="mt-4 grid grid-cols-1 gap-3">
                        {isWorkoutsLoading ? (
                            <div className="text-text-secondary">{t.loading}</div>
                        ) : completedWorkouts.length > 0 ? (
                            completedWorkouts.map((w) => (
                                <WorkoutHistoryCard
                                    key={w.id}
                                    workout={w}
                                    onDelete={(id) => setWorkoutIdToDelete(id)}
                                />
                            ))
                        ) : (
                            <div className="text-text-secondary">{t.emptyHistory}</div>
                        )}
                    </div>
                </ContentCard>
            </div>

            <ConfirmationModal
                isOpen={workoutIdToDelete !== null}
                title={t.deleteWorkoutTitle}
                message={t.deleteWorkoutMessage}
                cancelText={t.cancel}
                confirmText={deleteWorkoutMutation.isPending ? t.deleting : t.delete}
                onCancel={() => setWorkoutIdToDelete(null)}
                onConfirm={() => {
                    if (!workoutIdToDelete) return;
                    deleteWorkoutMutation.mutate(workoutIdToDelete, {
                        onSuccess: () => setWorkoutIdToDelete(null),
                        onError: () => setWorkoutIdToDelete(null),
                    });
                }}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                initialProfile={profile}
                isSaving={updateProfileMutation.isPending}
                onClose={() => setIsProfileModalOpen(false)}
                onLanguageChange={(nextLang) =>
                    updateProfileMutation.mutate({ language: nextLang })
                }
                onSave={(nextProfile) => {
                    updateProfileMutation.mutate(nextProfile, {
                        onSuccess: () => setIsProfileModalOpen(false),
                    });
                }}
            />
        </ContentPage>
    );
};
