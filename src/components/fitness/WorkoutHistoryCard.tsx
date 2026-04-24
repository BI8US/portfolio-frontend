import React from 'react';

import type { Workout } from '../../types/workout';
import { Button } from '../common/Button';
import { ContentCard } from '../common/ContentCard';

interface WorkoutHistoryCardProps {
    workout: Workout;
    onDelete?: (workoutId: string) => void;
}

function formatDate(date: string) {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) {
        return date;
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });
}

export const WorkoutHistoryCard: React.FC<WorkoutHistoryCardProps> = ({ workout, onDelete }) => {
    const plan = workout.actualData ?? workout.plannedData;
    const exercisesCount = plan.exercises.length;
    const totalSets = plan.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
    const completedSets =
        workout.status === 'COMPLETED'
            ? plan.exercises.reduce(
                  (acc, ex) => acc + ex.sets.filter((s) => s.isCompleted).length,
                  0,
              )
            : null;

    const badgeClasses =
        workout.status === 'COMPLETED'
            ? 'bg-text-success/10 text-text-success border-text-success/20'
            : 'bg-text-accent/10 text-text-accent border-text-accent/20';

    return (
        <ContentCard className="p-4 md:p-6">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="text-text-primary font-bold text-lg break-words">
                        {workout.title}
                    </div>
                    <div className="text-text-secondary text-sm mt-1">
                        {formatDate(workout.date)}
                    </div>
                </div>
                <div
                    className={`shrink-0 border rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses}`}
                >
                    {workout.status === 'COMPLETED' ? 'Completed' : 'Planned'}
                </div>
            </div>

            {onDelete && (
                <div className="mt-3 flex justify-end">
                    <Button
                        type="danger"
                        htmlType="button"
                        onClick={() => onDelete(workout.id)}
                        className="py-1 px-3 text-sm"
                    >
                        Delete
                    </Button>
                </div>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
                <div className="text-xs font-semibold bg-page/50 text-text-primary rounded-full px-3 py-1 border border-border">
                    {plan.focus}
                </div>
                <div className="text-xs bg-page/50 text-text-secondary rounded-full px-3 py-1 border border-border">
                    Exercises: {exercisesCount}
                </div>
                <div className="text-xs bg-page/50 text-text-secondary rounded-full px-3 py-1 border border-border">
                    Sets: {totalSets}
                </div>
                {completedSets !== null && (
                    <div className="text-xs bg-text-success/10 text-text-success rounded-full px-3 py-1 border border-text-success/20">
                        Completed: {completedSets}/{totalSets}
                    </div>
                )}
            </div>

            <details className="mt-3">
                <summary className="cursor-pointer select-none text-sm font-semibold text-text-secondary hover:text-text-primary">
                    Workout details
                </summary>
                <div className="mt-3 space-y-3">
                    {plan.exercises.map((ex, exIdx) => (
                        <div key={ex.id} className="rounded-xl bg-page/30 p-3 border border-border">
                            <div className="text-text-primary font-semibold">
                                {exIdx + 1}. {ex.name}
                            </div>
                            <div className="text-text-muted text-sm mt-1">
                                Rest: {ex.restTimeSeconds}s
                            </div>

                            <div className="mt-2">
                                <div className="grid grid-cols-[2.5rem_1fr_1fr] gap-2 text-[11px] font-semibold text-text-muted uppercase tracking-wide">
                                    <div className="text-center">Set</div>
                                    <div className="text-center">Weight</div>
                                    <div className="text-center">Reps</div>
                                </div>

                                <div className="mt-1 space-y-1">
                                    {ex.sets.map((set, setIdx) => (
                                        <div
                                            key={set.id}
                                            className={[
                                                'grid grid-cols-[2.5rem_1fr_1fr] gap-2 items-center',
                                                'rounded-lg py-2',
                                                set.isCompleted
                                                    ? 'bg-text-success/10 border border-text-success/20'
                                                    : 'bg-content border border-border',
                                            ]
                                                .join(' ')
                                                .trim()}
                                        >
                                            <div className="text-center text-text-muted font-semibold">
                                                {setIdx + 1}
                                            </div>
                                            <div className="text-center font-semibold text-text-primary">
                                                {set.weight}
                                            </div>
                                            <div className="text-center font-semibold text-text-primary">
                                                {set.reps}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </details>

            {workout.aiFeedback && (
                <details className="mt-3">
                    <summary className="cursor-pointer select-none text-sm font-semibold text-text-secondary hover:text-text-primary">
                        AI feedback
                    </summary>
                    <div className="mt-2 text-text-secondary whitespace-pre-wrap">
                        {workout.aiFeedback}
                    </div>
                </details>
            )}
        </ContentCard>
    );
};
