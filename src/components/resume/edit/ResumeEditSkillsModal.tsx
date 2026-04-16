import React, { useState } from 'react';

import { SkillGroupItem, SkillItem } from '../../../types/resume';
import { moveItemInArray } from '../../../utils/sortUtils';
import { Button } from '../../common/Button';
import { ContentCard } from '../../common/ContentCard';
import { Input } from '../../common/Input';
import { Modal } from '../../common/Modal';
import { SortButtons } from '../../common/SortButtons';

interface ResumeEditSkillsModalProps {
    initialGroups: SkillGroupItem[];
    onSubmit: (groups: SkillGroupItem[]) => void;
    onCancel: () => void;
}

export const ResumeEditSkillsModal: React.FC<ResumeEditSkillsModalProps> = ({
    initialGroups,
    onSubmit,
    onCancel,
}) => {
    const [groups, setGroups] = useState<SkillGroupItem[]>(
        initialGroups.length > 0 ? initialGroups : [],
    );

    const [skillStrings, setSkillStrings] = useState<Record<number, string>>(() => {
        const initialStrings: Record<number, string> = {};
        initialGroups.forEach((group, index) => {
            initialStrings[index] = group.skills.map((s) => s.name).join(', ');
        });
        return initialStrings;
    });

    const handleGroupNameChange = (index: number, name: string) => {
        const updated = [...groups];
        updated[index] = { ...updated[index], name };
        setGroups(updated);
    };

    const handleSkillsStringChange = (index: number, value: string) => {
        setSkillStrings((prev) => ({ ...prev, [index]: value }));
    };

    const syncSkillsOnBlur = (index: number) => {
        const text = skillStrings[index] || '';
        const currentGroup = groups[index];

        const names = text
            .split(',')
            .map((s) => s.trim())
            .filter((s) => s !== '');

        const uniqueNames = [...new Set(names)];

        const newSkills: SkillItem[] = uniqueNames.map((name, i) => {
            const existing = currentGroup.skills.find((s) => s.name === name);
            return {
                id: existing?.id,
                name: name,
                sortOrder: i,
            };
        });

        const updated = [...groups];
        updated[index] = { ...updated[index], skills: newSkills };
        setGroups(updated);
    };

    const handleAddGroup = () => {
        const newGroup: SkillGroupItem = {
            name: '',
            sortOrder: groups.length,
            skills: [],
        };
        const newIndex = groups.length;
        setGroups([...groups, newGroup]);
        setSkillStrings((prev) => ({ ...prev, [newIndex]: '' }));
    };

    const handleRemoveGroup = (index: number) => {
        const filtered = groups.filter((_, i) => i !== index);
        const reordered = filtered.map((g, i) => ({ ...g, sortOrder: i }));
        setGroups(reordered);

        const newStrings: Record<number, string> = {};
        reordered.forEach((group, i) => {
            newStrings[i] = group.skills.map((s) => s.name).join(', ');
        });
        setSkillStrings(newStrings);
    };

    const handleMoveGroup = (index: number, direction: 'up' | 'down') => {
        const moved = moveItemInArray<SkillGroupItem>(groups, index, direction);
        setGroups(moved);

        const newStrings: Record<number, string> = {};
        moved.forEach((group, i) => {
            newStrings[i] = group.skills.map((s) => s.name).join(', ');
        });
        setSkillStrings(newStrings);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const finalGroups = groups.map((group, index) => {
            const text = skillStrings[index] || '';
            const names = text
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s !== '');
            const skills: SkillItem[] = names.map((name, i) => {
                const existing = group.skills.find((s) => s.name === name);
                return { id: existing?.id, name, sortOrder: i };
            });
            return { ...group, skills };
        });

        onSubmit(finalGroups);
    };

    return (
        <Modal>
            <ContentCard className="max-w-3xl w-full">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4 text-text-primary">Edit Skills</h2>

                    <div className="flex gap-2 mb-2 font-semibold text-text-secondary text-sm">
                        <div className="w-8"></div>
                        <div className="basis-1/3">Skill Group</div>
                        <div className="basis-2/3">Skills (comma-separated)</div>
                        <div className="w-10"></div>
                    </div>

                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                        {groups.map((group, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <SortButtons
                                    onMoveUp={() => handleMoveGroup(index, 'up')}
                                    onMoveDown={() => handleMoveGroup(index, 'down')}
                                    disableUp={index === 0}
                                    disableDown={index === groups.length - 1}
                                />

                                <div className="basis-1/3">
                                    <Input
                                        type="text"
                                        value={group.name}
                                        onChange={(e) =>
                                            handleGroupNameChange(index, e.target.value)
                                        }
                                        placeholder="Frontend"
                                        className="mb-0"
                                    />
                                </div>

                                <div className="basis-2/3">
                                    <Input
                                        type="text"
                                        value={skillStrings[index] ?? ''}
                                        onChange={(e) =>
                                            handleSkillsStringChange(index, e.target.value)
                                        }
                                        onBlur={() => syncSkillsOnBlur(index)}
                                        placeholder="React, Vue, HTML"
                                        className="mb-0"
                                    />
                                </div>

                                <Button
                                    type="danger"
                                    onClick={() => handleRemoveGroup(index)}
                                    htmlType="button"
                                    className="border-transparent p-1"
                                >
                                    <span className="material-symbols-outlined text-2xl">
                                        delete
                                    </span>
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button type="secondary" onClick={handleAddGroup} htmlType="button">
                            <span className="material-symbols-outlined text-2xl">add</span>
                        </Button>
                    </div>

                    <div className="flex justify-end gap-2 mt-6 border-t pt-4">
                        <Button type="secondary" onClick={onCancel} htmlType="button">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Save changes
                        </Button>
                    </div>
                </form>
            </ContentCard>
        </Modal>
    );
};
