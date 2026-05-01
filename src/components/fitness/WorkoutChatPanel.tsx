import React from 'react';

import type { ChatMessage } from '../../services/workouts/api';
import { getWorkoutChatMessages } from '../../services/workouts/api';
import { useWorkoutChat } from '../../services/workouts/hooks';
import type { WorkoutPlan } from '../../types/workout';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface WorkoutChatPanelProps {
    workoutId: string;
    className?: string;
}

export const WorkoutChatPanel: React.FC<WorkoutChatPanelProps> = ({ workoutId, className }) => {
    const chatMutation = useWorkoutChat(workoutId);

    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    const [draft, setDraft] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = React.useState(false);
    const [sheetHeightPx, setSheetHeightPx] = React.useState<number | null>(null);
    const [isDesktop, setIsDesktop] = React.useState(false);
    const dragRef = React.useRef<{
        pointerId: number;
        startY: number;
        startHeight: number;
    } | null>(null);
    const listRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

    React.useEffect(() => {
        const mq = window.matchMedia('(min-width: 640px)');
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener('change', update);
        return () => mq.removeEventListener('change', update);
    }, []);

    const clampSheetHeight = React.useCallback((px: number) => {
        const vh = window.innerHeight || 800;
        const min = Math.round(vh * 0.35);
        const max = Math.round(vh * 0.9);
        return Math.max(min, Math.min(max, px));
    }, []);

    React.useEffect(() => {
        if (!isOpen) return;
        if (!isDesktop && sheetHeightPx === null) {
            const vh = window.innerHeight || 800;
            setSheetHeightPx(Math.round(vh * 0.6));
        }
    }, [isDesktop, isOpen, sheetHeightPx]);

    React.useEffect(() => {
        const onMove = (e: PointerEvent) => {
            const drag = dragRef.current;
            if (!drag) return;
            const dy = e.clientY - drag.startY;
            const next = clampSheetHeight(drag.startHeight - dy);
            setSheetHeightPx(next);
        };
        const onUp = () => {
            dragRef.current = null;
        };

        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp);
        window.addEventListener('pointercancel', onUp);
        return () => {
            window.removeEventListener('pointermove', onMove);
            window.removeEventListener('pointerup', onUp);
            window.removeEventListener('pointercancel', onUp);
        };
    }, [clampSheetHeight]);

    React.useEffect(() => {
        if (!isOpen) return;
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
    }, [isOpen, messages, chatMutation.isPending]);

    const resizeInput = React.useCallback(() => {
        const el = inputRef.current;
        if (!el) return;
        el.style.height = 'auto';
        const next = Math.min(el.scrollHeight, 140);
        el.style.height = `${next}px`;
    }, []);

    React.useEffect(() => {
        resizeInput();
    }, [draft, resizeInput]);

    React.useEffect(() => {
        if (!isOpen) {
            return;
        }

        let isCancelled = false;
        setIsHistoryLoading(true);
        getWorkoutChatMessages(workoutId, 50)
            .then((serverMessages) => {
                if (isCancelled) return;
                setMessages(serverMessages);
            })
            .catch(() => {
                if (isCancelled) return;
                setMessages((prev) =>
                    prev.length > 0
                        ? prev
                        : [
                              {
                                  role: 'ai',
                                  text: "Couldn't load chat history.",
                                  timestamp: new Date().toISOString(),
                              },
                          ],
                );
            })
            .finally(() => {
                if (isCancelled) return;
                setIsHistoryLoading(false);
            });

        return () => {
            isCancelled = true;
        };
    }, [isOpen, workoutId]);

    const formatTime = (iso: string) => {
        const d = new Date(iso);
        if (Number.isNaN(d.getTime())) return '';
        return d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    const readDraftFromStorage = (): WorkoutPlan | null => {
        if (typeof window === 'undefined') return null;
        try {
            const raw = window.localStorage.getItem(`fitness.workoutDraft.v1.${workoutId}`);
            if (!raw) return null;
            return JSON.parse(raw) as WorkoutPlan;
        } catch {
            return null;
        }
    };

    const send = () => {
        const text = draft.trim();
        if (!text || chatMutation.isPending) return;

        setMessages((prev) => [
            ...prev,
            { role: 'user', text, timestamp: new Date().toISOString() },
        ]);
        setDraft('');

        chatMutation.mutate(
            { message: text, draft: readDraftFromStorage() },
            {
                onSuccess: (data) => {
                    setMessages((prev) => [
                        ...prev,
                        { role: 'ai', text: data.reply, timestamp: data.timestamp },
                    ]);
                },
                onError: () => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: 'ai',
                            text: "Couldn't send the message. Please try again.",
                            timestamp: new Date().toISOString(),
                        },
                    ]);
                },
            },
        );
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={[
                    'fixed bottom-24 right-4 z-20',
                    'rounded-full px-4 py-3',
                    'bg-button-primary text-content font-semibold',
                    'shadow-lg shadow-overlay/10',
                    'hover:opacity-95 active:opacity-90',
                    className || '',
                ]
                    .join(' ')
                    .trim()}
                aria-label="Open coach chat"
            >
                <span
                    className="material-symbols-outlined align-middle text-[20px] leading-none"
                    aria-hidden="true"
                >
                    chat
                </span>
                <span className="ml-2 align-middle">Ask the coach</span>
            </button>

            <div
                className={['fixed inset-0 z-30 pointer-events-none'].join(' ').trim()}
                aria-hidden={!isOpen}
            >
                <div
                    className={[
                        // No blur: keep background readable while chatting.
                        // Also don't block interaction with the underlying page.
                        'pointer-events-none absolute inset-0 bg-overlay/10 transition-opacity',
                        isOpen ? 'opacity-100' : 'opacity-0',
                    ]
                        .join(' ')
                        .trim()}
                />

                <aside
                    className={[
                        'absolute left-0 right-0 bottom-0 w-full',
                        'sm:left-auto sm:right-0 sm:top-0 sm:bottom-auto sm:h-full sm:w-[420px]',
                        'bg-content border-t border-border sm:border-t-0 sm:border-l sm:border-border',
                        'transition-transform duration-200 ease-out',
                        isOpen
                            ? 'translate-y-0 sm:translate-x-0'
                            : 'translate-y-full sm:translate-y-0 sm:translate-x-full',
                        'flex flex-col pointer-events-auto',
                    ]
                        .join(' ')
                        .trim()}
                    style={
                        !isDesktop && sheetHeightPx !== null
                            ? ({ height: sheetHeightPx } as React.CSSProperties)
                            : undefined
                    }
                >
                    <div
                        className="sm:hidden flex justify-center pt-2 pb-1 cursor-ns-resize touch-none"
                        onPointerDown={(e) => {
                            const startHeight =
                                sheetHeightPx ?? Math.round((window.innerHeight || 800) * 0.6);
                            dragRef.current = {
                                pointerId: e.pointerId,
                                startY: e.clientY,
                                startHeight,
                            };
                            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
                        }}
                        onDoubleClick={() => {
                            const vh = window.innerHeight || 800;
                            const target =
                                (sheetHeightPx ?? Math.round(vh * 0.6)) < vh * 0.75
                                    ? Math.round(vh * 0.9)
                                    : Math.round(vh * 0.6);
                            setSheetHeightPx(clampSheetHeight(target));
                        }}
                        aria-label="Resize chat"
                        title="Drag up/down to resize"
                    >
                        <div className="h-1.5 w-10 rounded-full bg-border" />
                    </div>
                    <div className="p-4 border-b border-border flex items-center justify-between">
                        <div className="min-w-0">
                            <div className="text-text-primary font-bold">Coach</div>
                            <div className="text-text-muted text-sm">
                                Ask about technique or request a plan change
                            </div>
                        </div>
                        <button
                            type="button"
                            className="text-text-muted hover:text-text-primary px-2 py-1"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            ✕
                        </button>
                    </div>

                    <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                        {isHistoryLoading ? (
                            <div className="text-text-secondary text-sm">Loading history…</div>
                        ) : messages.length === 0 ? (
                            <div className="text-text-secondary text-sm">
                                No messages yet. Ask anything about your workout.
                            </div>
                        ) : (
                            messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={[
                                        'max-w-[90%] rounded-2xl px-3 py-2 whitespace-pre-wrap',
                                        m.role === 'user'
                                            ? 'ml-auto bg-page/50 text-text-primary border border-border'
                                            : 'mr-auto bg-text-success/10 text-text-primary border border-border',
                                    ]
                                        .join(' ')
                                        .trim()}
                                >
                                    <div>{m.text}</div>
                                    <div
                                        className={[
                                            'mt-1 text-[11px]',
                                            m.role === 'user'
                                                ? 'text-text-muted'
                                                : 'text-text-success/80',
                                        ]
                                            .join(' ')
                                            .trim()}
                                    >
                                        {formatTime(m.timestamp)}
                                    </div>
                                </div>
                            ))
                        )}

                        {chatMutation.isPending && (
                            <div className="mr-auto bg-text-success/10 text-text-primary rounded-2xl px-3 py-2 border border-border">
                                Coach is typing…
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-border pb-[calc(env(safe-area-inset-bottom)+1rem)]">
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <Input
                                    textarea
                                    aria-label="Message"
                                    placeholder="Message"
                                    value={draft}
                                    onChange={(e) => setDraft(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            send();
                                        }
                                    }}
                                    className="!mb-0 resize-none overflow-hidden"
                                    rows={1}
                                    ref={inputRef}
                                    onInput={resizeInput}
                                />
                            </div>
                            <Button
                                type="primary"
                                htmlType="button"
                                onClick={send}
                                disabled={chatMutation.isPending || !draft.trim()}
                                className="shrink-0"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
};
