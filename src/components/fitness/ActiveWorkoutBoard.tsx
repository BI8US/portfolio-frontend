import React, { useEffect, useMemo, useState } from 'react';

import type { ExerciseData, SetData, WorkoutPlan } from '../../types/workout';
import { Button } from '../common/Button';
import { WorkoutChatPanel } from './WorkoutChatPanel';

interface ActiveWorkoutBoardProps {
    workoutId: string;
    plan: WorkoutPlan;
    isCompleting?: boolean;
    onComplete: (actualData: WorkoutPlan) => void;
}

function clampNumber(value: number, min: number, max: number) {
    if (Number.isNaN(value)) {
        return min;
    }
    return Math.min(max, Math.max(min, value));
}

function newId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function storageKey(workoutId: string) {
    return `fitness.workoutDraft.v1.${workoutId}`;
}

function safeJsonParse<T>(raw: string | null): T | null {
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

function normalizeExerciseName(name: string) {
    return name
        .trim()
        .toLocaleLowerCase()
        .replaceAll('ё', 'е')
        .replaceAll(/[\s\-–—_]+/g, ' ')
        .replaceAll(/[^\p{L}\p{N} ]/gu, '')
        .trim();
}

function mergePlanWithProgress(nextPlan: WorkoutPlan, savedDraft: WorkoutPlan | null): WorkoutPlan {
    if (!savedDraft) return nextPlan;

    const savedByExerciseId = new Map(savedDraft.exercises.map((e) => [e.id, e]));
    const savedByName = new Map<string, ExerciseData[]>();
    for (const ex of savedDraft.exercises) {
        const key = normalizeExerciseName(ex.name);
        const list = savedByName.get(key) ?? [];
        list.push(ex);
        savedByName.set(key, list);
    }

    const usedSavedExerciseIds = new Set<string>();

    const mergedPlannedExercises = nextPlan.exercises.map((plannedExercise) => {
        let savedExercise = savedByExerciseId.get(plannedExercise.id) ?? null;
        if (!savedExercise) {
            const key = normalizeExerciseName(plannedExercise.name);
            const candidates = savedByName.get(key) ?? [];
            const next = candidates.find((c) => !usedSavedExerciseIds.has(c.id)) ?? null;
            if (next) {
                savedExercise = next;
            }
        }

        if (!savedExercise) return plannedExercise;
        const savedEx = savedExercise;
        usedSavedExerciseIds.add(savedEx.id);

        const savedSetsById = new Map(savedEx.sets.map((s) => [s.id, s]));
        const mergedSets: SetData[] = plannedExercise.sets.map((plannedSet, idx) => {
            const byId = savedSetsById.get(plannedSet.id);
            if (byId) return byId;

            const byIndex = savedEx.sets[idx];
            return byIndex ?? plannedSet;
        });

        // Preserve any extra user-added sets (beyond what the updated plan has).
        const extraSavedSets = savedEx.sets.filter(
            (s, idx) =>
                !plannedExercise.sets.some((p) => p.id === s.id) &&
                idx >= plannedExercise.sets.length,
        );

        return {
            ...plannedExercise,
            // If user renamed an exercise mid-workout, keep it.
            name: savedEx.name,
            sets: [...mergedSets, ...extraSavedSets],
        };
    });

    // If user had extra exercises in draft (rare, but can happen with older drafts),
    // keep them at the end so progress isn't silently dropped.
    const extraSavedExercises = savedDraft.exercises.filter(
        (e) =>
            !nextPlan.exercises.some((p) => p.id === e.id) &&
            !mergedPlannedExercises.some((p) => p.id === e.id),
    );

    return {
        ...nextPlan,
        exercises: [...mergedPlannedExercises, ...extraSavedExercises],
    };
}

export const ActiveWorkoutBoard: React.FC<ActiveWorkoutBoardProps> = ({
    workoutId,
    plan,
    isCompleting,
    onComplete,
}) => {
    const initial = useMemo<WorkoutPlan>(
        () => JSON.parse(JSON.stringify(plan)) as WorkoutPlan,
        [plan],
    );
    const [draft, setDraft] = useState<WorkoutPlan>(() => {
        if (typeof window === 'undefined') return initial;
        const saved = safeJsonParse<WorkoutPlan>(
            window.localStorage.getItem(storageKey(workoutId)),
        );
        return mergePlanWithProgress(initial, saved);
    });

    const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');

    useEffect(() => {
        if (typeof window === 'undefined') {
            setDraft(initial);
            return;
        }

        const saved = safeJsonParse<WorkoutPlan>(
            window.localStorage.getItem(storageKey(workoutId)),
        );
        setDraft(mergePlanWithProgress(initial, saved));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [workoutId, initial]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem(storageKey(workoutId), JSON.stringify(draft));
    }, [workoutId, draft]);

    const updateSet = (exerciseId: string, setId: string, updater: (prev: SetData) => SetData) => {
        setDraft((prev) => ({
            ...prev,
            exercises: prev.exercises.map((ex) => {
                if (ex.id !== exerciseId) {
                    return ex;
                }
                return {
                    ...ex,
                    sets: ex.sets.map((s) => (s.id === setId ? updater(s) : s)),
                };
            }),
        }));
    };

    const updateExercise = (exerciseId: string, updater: (prev: ExerciseData) => ExerciseData) => {
        setDraft((prev) => ({
            ...prev,
            exercises: prev.exercises.map((ex) => (ex.id === exerciseId ? updater(ex) : ex)),
        }));
    };

    const addSet = (exerciseId: string) => {
        updateExercise(exerciseId, (ex) => {
            const last = ex.sets[ex.sets.length - 1];
            const next: SetData = {
                id: newId(),
                weight: last?.weight ?? 0,
                reps: last?.reps ?? 0,
                isCompleted: false,
            };
            return { ...ex, sets: [...ex.sets, next] };
        });
    };

    const removeSet = (exerciseId: string, setId: string) => {
        updateExercise(exerciseId, (ex) => {
            if (ex.sets.length <= 1) {
                return ex;
            }
            return { ...ex, sets: ex.sets.filter((s) => s.id !== setId) };
        });
    };

    const resetExerciseToPlanned = (exerciseId: string) => {
        const plannedExercise = initial.exercises.find((e) => e.id === exerciseId);
        if (!plannedExercise) {
            return;
        }

        updateExercise(
            exerciseId,
            () => JSON.parse(JSON.stringify(plannedExercise)) as ExerciseData,
        );
    };

    const startRename = (exercise: ExerciseData) => {
        setEditingExerciseId(exercise.id);
        setEditingName(exercise.name);
    };

    const commitRename = (exerciseId: string) => {
        const next = editingName.trim();
        if (!next) {
            setEditingExerciseId(null);
            return;
        }
        updateExercise(exerciseId, (ex) => ({ ...ex, name: next }));
        setEditingExerciseId(null);
    };

    return (
        <div>
            <div className="px-0">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <div className="text-text-primary text-xl font-bold">{draft.title}</div>
                        <div className="text-text-secondary mt-1">{draft.focus}</div>
                    </div>
                </div>

                {draft.aiMessage && (
                    <div className="mt-3 text-text-secondary whitespace-pre-wrap">
                        {draft.aiMessage}
                    </div>
                )}

                <div className="mt-4 divide-y divide-border">
                    {draft.exercises.map((exercise, exerciseIdx) => (
                        <div key={exercise.id} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    {editingExerciseId === exercise.id ? (
                                        <div className="flex items-center gap-2">
                                            <div className="text-text-primary font-semibold text-lg shrink-0">
                                                {exerciseIdx + 1}.
                                            </div>
                                            <input
                                                value={editingName}
                                                onChange={(e) => setEditingName(e.target.value)}
                                                onBlur={() => commitRename(exercise.id)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        commitRename(exercise.id);
                                                    }
                                                    if (e.key === 'Escape') {
                                                        setEditingExerciseId(null);
                                                    }
                                                }}
                                                autoFocus
                                                className="h-10 w-full bg-content border border-border rounded-md px-3 text-text-primary font-semibold focus:outline-none focus:ring-2 focus:ring-text-accent"
                                                aria-label="Exercise name"
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-text-primary font-semibold text-lg">
                                            {exerciseIdx + 1}. {exercise.name}
                                        </div>
                                    )}
                                    <div className="text-text-muted text-sm mt-1">
                                        Rest: {exercise.restTimeSeconds}s
                                    </div>
                                </div>
                                <div className="shrink-0 flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="text-sm text-text-muted hover:text-text-primary"
                                        onClick={() => startRename(exercise)}
                                    >
                                        Rename
                                    </button>
                                    <button
                                        type="button"
                                        className="text-sm text-text-muted hover:text-text-primary"
                                        onClick={() => resetExerciseToPlanned(exercise.id)}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>

                            <div className="mt-3 space-y-2">
                                <div className="grid grid-cols-[2.5rem_1fr_1fr_auto] items-center gap-2 sm:gap-3 bg-page/50 rounded-md px-2 py-2 border border-border">
                                    <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wide text-center">
                                        Set
                                    </div>
                                    <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wide text-center">
                                        Weight
                                    </div>
                                    <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wide text-center">
                                        Reps
                                    </div>
                                    <div className="text-[11px] font-semibold text-text-muted uppercase tracking-wide text-center min-w-[6rem]">
                                        Done
                                    </div>
                                </div>
                                {exercise.sets.map((set, idx) => (
                                    <div
                                        key={set.id}
                                        className={[
                                            'grid grid-cols-[2.5rem_1fr_1fr_auto] items-center gap-2 sm:gap-3',
                                            'rounded-xl py-2',
                                            set.isCompleted
                                                ? 'bg-text-success/10'
                                                : 'bg-transparent',
                                        ]
                                            .join(' ')
                                            .trim()}
                                    >
                                        <div className="w-8 text-center text-text-muted font-semibold justify-self-center">
                                            {idx + 1}
                                        </div>

                                        <div className="flex items-center justify-center gap-1 sm:gap-2 min-w-0">
                                            <span className="sr-only">Weight (kg)</span>
                                            <button
                                                type="button"
                                                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full text-text-primary bg-transparent hover:bg-border/30 active:bg-border/50"
                                                onClick={() =>
                                                    updateSet(exercise.id, set.id, (s) => ({
                                                        ...s,
                                                        weight: clampNumber(s.weight - 2.5, 0, 500),
                                                    }))
                                                }
                                                aria-label="Decrease weight"
                                            >
                                                −
                                            </button>
                                            <input
                                                inputMode="decimal"
                                                type="number"
                                                min={0}
                                                className="no-spin h-9 sm:h-10 w-12 bg-content border border-border rounded-md text-center font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-text-accent"
                                                value={set.weight}
                                                onChange={(e) =>
                                                    updateSet(exercise.id, set.id, (s) => ({
                                                        ...s,
                                                        weight: clampNumber(
                                                            Number(e.target.value),
                                                            0,
                                                            500,
                                                        ),
                                                    }))
                                                }
                                                aria-label="Weight"
                                            />
                                            <button
                                                type="button"
                                                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full text-text-primary bg-transparent hover:bg-border/30 active:bg-border/50"
                                                onClick={() =>
                                                    updateSet(exercise.id, set.id, (s) => ({
                                                        ...s,
                                                        weight: clampNumber(s.weight + 2.5, 0, 500),
                                                    }))
                                                }
                                                aria-label="Increase weight"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-center gap-1 sm:gap-2 min-w-0">
                                            <span className="sr-only">Repetitions</span>
                                            <button
                                                type="button"
                                                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full text-text-primary bg-transparent hover:bg-border/30 active:bg-border/50"
                                                onClick={() =>
                                                    updateSet(exercise.id, set.id, (s) => ({
                                                        ...s,
                                                        reps: clampNumber(s.reps - 1, 0, 999),
                                                    }))
                                                }
                                                aria-label="Decrease reps"
                                            >
                                                −
                                            </button>
                                            <input
                                                inputMode="numeric"
                                                type="number"
                                                min={0}
                                                className="no-spin h-9 sm:h-10 w-12 bg-content border border-border rounded-md text-center font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-text-accent"
                                                value={set.reps}
                                                onChange={(e) =>
                                                    updateSet(exercise.id, set.id, (s) => ({
                                                        ...s,
                                                        reps: clampNumber(
                                                            Number(e.target.value),
                                                            0,
                                                            999,
                                                        ),
                                                    }))
                                                }
                                                aria-label="Reps"
                                            />
                                            <button
                                                type="button"
                                                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full text-text-primary bg-transparent hover:bg-border/30 active:bg-border/50"
                                                onClick={() =>
                                                    updateSet(exercise.id, set.id, (s) => ({
                                                        ...s,
                                                        reps: clampNumber(s.reps + 1, 0, 999),
                                                    }))
                                                }
                                                aria-label="Increase reps"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-center gap-2 justify-self-center">
                                            <label
                                                className={[
                                                    'flex items-center gap-2 select-none shrink-0',
                                                    set.isCompleted ? 'opacity-70' : '',
                                                ]
                                                    .join(' ')
                                                    .trim()}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={set.isCompleted}
                                                    onChange={(e) =>
                                                        updateSet(exercise.id, set.id, (s) => ({
                                                            ...s,
                                                            isCompleted: e.target.checked,
                                                        }))
                                                    }
                                                    className={[
                                                        'relative appearance-none',
                                                        'h-6 w-6 sm:h-7 sm:w-7 rounded-md',
                                                        'bg-content border border-border',
                                                        'checked:bg-button-primary checked:border-button-primary',
                                                        'focus:outline-none focus:ring-2 focus:ring-text-accent',
                                                        "checked:before:content-['✓'] checked:before:absolute checked:before:inset-0",
                                                        'checked:before:flex checked:before:items-center checked:before:justify-center',
                                                        'checked:before:text-content checked:before:text-base sm:checked:before:text-lg',
                                                    ]
                                                        .join(' ')
                                                        .trim()}
                                                    aria-label="Completed"
                                                />
                                                <span className="hidden sm:inline text-text-secondary font-semibold">
                                                    Completed
                                                </span>
                                            </label>

                                            {exercise.sets.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="h-9 w-9 sm:h-10 sm:w-10 rounded-full text-text-muted hover:bg-border/30 hover:text-text-primary active:bg-border/50"
                                                    onClick={() => removeSet(exercise.id, set.id)}
                                                    aria-label="Delete set"
                                                    title="Delete set"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-2">
                                <button
                                    type="button"
                                    className="text-sm font-semibold text-text-accent hover:text-text-primary"
                                    onClick={() => addSet(exercise.id)}
                                >
                                    + Add set
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="sticky bottom-0 z-10 pb-[calc(env(safe-area-inset-bottom)+1rem)]">
                <Button
                    type="primary"
                    htmlType="button"
                    className="w-full text-lg py-3 mt-4"
                    onClick={() => onComplete(draft)}
                    disabled={!!isCompleting}
                >
                    {isCompleting ? 'Finishing…' : 'Finish workout'}
                </Button>
            </div>

            <WorkoutChatPanel workoutId={workoutId} />
        </div>
    );
};
