import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { UserProfile, Workout, WorkoutPlan } from '../../types/workout';
import {
    completeWorkout,
    createWorkoutPlan,
    deleteWorkout,
    getProfile,
    getWorkouts,
    sendWorkoutChatMessage,
    updateProfile,
} from './api';

const workoutKeys = {
    all: ['workouts'] as const,
    profile: ['workouts', 'profile'] as const,
};

export function useWorkoutProfile() {
    return useQuery<UserProfile>({
        queryKey: workoutKeys.profile,
        queryFn: getProfile,
    });
}

export function useUpdateWorkoutProfile() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<UserProfile>) => updateProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workoutKeys.profile });
        },
    });
}

export function useWorkouts() {
    return useQuery<Workout[]>({
        queryKey: workoutKeys.all,
        queryFn: getWorkouts,
    });
}

export function useCreateWorkoutPlan() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userRequest: string) => createWorkoutPlan(userRequest),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workoutKeys.all });
        },
    });
}

export function useCompleteWorkout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ workoutId, actualData }: { workoutId: string; actualData: WorkoutPlan }) =>
            completeWorkout(workoutId, actualData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: workoutKeys.all });
        },
    });
}

export function useWorkoutChat(workoutId: string) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ message, draft }: { message: string; draft?: WorkoutPlan | null }) =>
            sendWorkoutChatMessage(workoutId, message, draft),
        onSuccess: (data) => {
            const updatedPlan = data.updatedPlan;
            if (!updatedPlan) {
                return;
            }

            queryClient.setQueryData<Workout[] | undefined>(workoutKeys.all, (old) => {
                if (!old) return old;
                return old.map((w) =>
                    w.id === workoutId ? { ...w, plannedData: updatedPlan } : w,
                );
            });
        },
    });
}

export function useDeleteWorkout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (workoutId: string) => deleteWorkout(workoutId),
        onSuccess: (_, workoutId) => {
            queryClient.setQueryData<Workout[] | undefined>(workoutKeys.all, (old) => {
                if (!old) return old;
                return old.filter((w) => w.id !== workoutId);
            });
        },
    });
}
