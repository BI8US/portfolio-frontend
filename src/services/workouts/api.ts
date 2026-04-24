import type { UserProfile, Workout, WorkoutPlan } from '../../types/workout';
import { api } from '../client';

export interface ChatMessage {
    role: 'user' | 'ai';
    text: string;
    timestamp: string;
}

export interface WorkoutChatResponse {
    reply: string;
    updatedPlan: WorkoutPlan | null;
    timestamp: string;
}

export const getProfile = async (): Promise<UserProfile> => {
    const response = await api.get<UserProfile>('/workouts/profile');
    return response.data;
};

export const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await api.put<UserProfile>('/workouts/profile', data);
    return response.data;
};

export const getWorkouts = async (): Promise<Workout[]> => {
    const response = await api.get<Workout[]>('/workouts');
    return response.data;
};

export const createWorkoutPlan = async (userRequest: string): Promise<Workout> => {
    try {
        const response = await api.post<Workout>('/workouts/plan', { userRequest });
        return response.data;
    } catch (err: any) {
        const status = err?.response?.status;
        if (status === 404) {
            const fallback = await api.post<Workout>('/workouts/generate', { userRequest });
            return fallback.data;
        }
        throw err;
    }
};

export const completeWorkout = async (
    workoutId: string,
    actualData: WorkoutPlan,
): Promise<Workout> => {
    const response = await api.put<Workout>(`/workouts/${workoutId}/complete`, { actualData });
    return response.data;
};

export const sendWorkoutChatMessage = async (
    workoutId: string,
    message: string,
): Promise<WorkoutChatResponse> => {
    const response = await api.post<WorkoutChatResponse>(`/workouts/${workoutId}/chat`, {
        message,
    });
    return response.data;
};

export const getWorkoutChatMessages = async (
    workoutId: string,
    limit = 50,
): Promise<ChatMessage[]> => {
    const response = await api.get<ChatMessage[]>(
        `/workouts/${workoutId}/chat/messages?limit=${limit}`,
    );
    return response.data;
};

export const deleteWorkout = async (workoutId: string): Promise<void> => {
    await api.delete(`/workouts/${workoutId}`);
};
