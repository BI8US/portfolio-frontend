export interface UserProfile {
    id?: string;
    weight: number;
    height: number;
    age: number;
    experienceLevel: string;
    goals: string;
    sportsBackground?: string;
    language?: 'ru' | 'en';
}

export interface SetData {
    id: string;
    weight: number;
    reps: number;
    isCompleted: boolean;
}

export interface ExerciseData {
    id: string;
    name: string;
    restTimeSeconds: number;
    sets: SetData[];
}

export interface WorkoutPlan {
    title: string;
    focus: string;
    exercises: ExerciseData[];
    aiMessage: string;
}

export interface Workout {
    id: string;
    date: string;
    title: string;
    status: 'PLANNED' | 'COMPLETED';
    plannedData: WorkoutPlan;
    actualData?: WorkoutPlan | null;
    aiFeedback?: string | null;
}
