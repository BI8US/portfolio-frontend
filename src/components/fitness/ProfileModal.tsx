import React, { useEffect, useMemo, useState } from 'react';

import type { UserProfile } from '../../types/workout';
import { Button } from '../common/Button';
import { ContentCard } from '../common/ContentCard';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { Select } from '../common/Select';

interface ProfileModalProps {
    isOpen: boolean;
    initialProfile?: UserProfile | null;
    isSaving?: boolean;
    onClose: () => void;
    onSave: (profile: UserProfile) => void;
    onLanguageChange?: (language: 'ru' | 'en') => void;
}

const EXPERIENCE_OPTIONS = [
    { label: 'Beginner', value: 'BEGINNER' },
    { label: 'Intermediate', value: 'INTERMEDIATE' },
    { label: 'Advanced', value: 'ADVANCED' },
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
    isOpen,
    initialProfile,
    isSaving,
    onClose,
    onSave,
    onLanguageChange,
}) => {
    const defaults = useMemo<UserProfile>(
        () => ({
            weight: initialProfile?.weight ?? 0,
            height: initialProfile?.height ?? 0,
            age: initialProfile?.age ?? 0,
            experienceLevel: initialProfile?.experienceLevel ?? 'BEGINNER',
            goals: initialProfile?.goals ?? '',
            sportsBackground: initialProfile?.sportsBackground ?? '',
            language: initialProfile?.language ?? 'en',
        }),
        [initialProfile],
    );

    const [profile, setProfile] = useState<UserProfile>(defaults);

    useEffect(() => {
        if (!isOpen) {
            return;
        }
        setProfile(defaults);
    }, [defaults, isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <Modal>
            <ContentCard className="max-w-2xl">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-text-primary text-xl font-bold">My profile</h2>
                        <p className="text-text-secondary mt-1">
                            This helps the coach keep workouts safe and accurate.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-text-muted hover:text-text-primary px-2 py-1"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="text-text-secondary font-medium">Language</div>
                    <div className="flex items-center gap-1 border border-border rounded-full bg-content p-1">
                        <button
                            type="button"
                            onClick={() => {
                                setProfile((p) => ({ ...p, language: 'ru' }));
                                onLanguageChange?.('ru');
                            }}
                            className={[
                                'px-3 py-1 rounded-full text-sm font-semibold transition-colors',
                                profile.language === 'ru'
                                    ? 'bg-button-primary text-content'
                                    : 'text-text-secondary hover:bg-border/20',
                            ]
                                .join(' ')
                                .trim()}
                            aria-pressed={profile.language === 'ru'}
                        >
                            RU
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setProfile((p) => ({ ...p, language: 'en' }));
                                onLanguageChange?.('en');
                            }}
                            className={[
                                'px-3 py-1 rounded-full text-sm font-semibold transition-colors',
                                profile.language === 'en'
                                    ? 'bg-button-primary text-content'
                                    : 'text-text-secondary hover:bg-border/20',
                            ]
                                .join(' ')
                                .trim()}
                            aria-pressed={profile.language === 'en'}
                        >
                            EN
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                        label="Weight (kg)"
                        inputMode="decimal"
                        type="number"
                        min={0}
                        value={String(profile.weight ?? '')}
                        onChange={(e) =>
                            setProfile((p) => ({ ...p, weight: Number(e.target.value) }))
                        }
                        className="text-lg p-3"
                    />
                    <Input
                        label="Height (cm)"
                        inputMode="numeric"
                        type="number"
                        min={0}
                        value={String(profile.height ?? '')}
                        onChange={(e) =>
                            setProfile((p) => ({ ...p, height: Number(e.target.value) }))
                        }
                        className="text-lg p-3"
                    />
                    <Input
                        label="Age"
                        inputMode="numeric"
                        type="number"
                        min={0}
                        value={String(profile.age ?? '')}
                        onChange={(e) => setProfile((p) => ({ ...p, age: Number(e.target.value) }))}
                        className="text-lg p-3"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <Select
                        label="Level"
                        name="experienceLevel"
                        value={profile.experienceLevel}
                        options={EXPERIENCE_OPTIONS}
                        onChange={(value) => setProfile((p) => ({ ...p, experienceLevel: value }))}
                        buttonClassName="bg-content text-text-primary text-lg p-3"
                    />
                    <Input
                        label="Goals"
                        value={profile.goals}
                        onChange={(e) => setProfile((p) => ({ ...p, goals: e.target.value }))}
                        className="text-lg p-3"
                    />
                </div>

                <div className="mt-2">
                    <Input
                        textarea
                        label="Sports background (optional)"
                        value={profile.sportsBackground ?? ''}
                        onChange={(e) =>
                            setProfile((p) => ({ ...p, sportsBackground: e.target.value }))
                        }
                        className="text-lg p-3"
                    />
                </div>

                <div className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-4">
                    <Button type="secondary" htmlType="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        htmlType="button"
                        onClick={() => onSave(profile)}
                        disabled={!!isSaving}
                        className="w-full md:w-auto"
                    >
                        {isSaving ? 'Saving…' : 'Save'}
                    </Button>
                </div>
            </ContentCard>
        </Modal>
    );
};
