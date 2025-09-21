import React, {useState, useEffect} from "react";
import {SkillItemPartial} from "../types/skillTypes";
import {ContentCard} from "./ContentCard";
import {Modal} from "./Modal";
import {Input} from "./Input";
import {Button} from "./Button";
import {getGroupedSkills} from "../utils/skillUtils";

interface ResumeEditSkillsModalProps {
    skills: SkillItemPartial[];
    onSubmit: (skills: SkillItemPartial[]) => void;
    onCancel: () => void;
}

export const ResumeEditSkillsModal: React.FC<ResumeEditSkillsModalProps>  = ({skills, onSubmit, onCancel}) => {

    const [groupedSkills, setGroupedSkills] = useState<{ [groupName: string]: SkillItemPartial[] }>({});
    const [inputValues, setInputValues] = useState<{ [groupName: string]: string }>({});

    useEffect(() => {
        const skillsGrouped = getGroupedSkills(skills)
        setGroupedSkills(skillsGrouped)
        const initialInputValues = Object.entries(skillsGrouped).reduce((acc, [groupName, skills]) => {
            acc[`skills-${groupName}`] = skills.map(s => s.name).join(', ');
            acc[groupName] = groupName;
            return acc;
        }, {} as { [groupName: string]: string });
        setInputValues(initialInputValues);
    }, [skills]);

    const handleSkillsStringChange = (groupName: string, skillsString: string) => {
        const currentSkillsInGroup = groupedSkills[groupName] || [];

        const parsedSkillNames = skillsString
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill !== '');

        const uniqueSkillNames = [...new Set(parsedSkillNames)];

        const newSkills = uniqueSkillNames.map(skillName => {
            const existingSkill = currentSkillsInGroup.find(s => s.name === skillName);

            if (existingSkill) {
                return existingSkill;
            } else {
                return {
                    skillGroup: groupName,
                    name: skillName,
                };
            }
        });

        setGroupedSkills(prevGroups => ({
            ...prevGroups,
            [groupName]: newSkills,
        }));
    };

    const handleGroupNameBlur = (oldGroupName: string, newGroupName: string) => {
        if (oldGroupName === newGroupName) {
            return;
        }

        setGroupedSkills(prevGroups => {
            const newGroups = { ...prevGroups };
            const skillsToMove = newGroups[oldGroupName];
            delete newGroups[oldGroupName];

            const updatedSkills = skillsToMove.map(s => ({ ...s, skillGroup: newGroupName }));

            newGroups[newGroupName] = [...(newGroups[newGroupName] || []), ...updatedSkills];
            return newGroups;
        });
    };

    const handleAddGroup = () => {
        const newGroupName = `New Group ${Object.keys(groupedSkills).length + 1}`;
        setGroupedSkills(prevGroups => ({
            ...prevGroups,
            [newGroupName]: [],
        }));
    };

    const handleRemoveGroup = (groupName: string) => {
        setGroupedSkills(prevGroups => {
            const newGroups = { ...prevGroups };
            delete newGroups[groupName];
            return newGroups;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const flatSkills = Object.values(groupedSkills).flat();
        onSubmit(flatSkills);
    };

    return (
        <Modal>
            <ContentCard>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">Edit Skills</h2>

                    <div className="flex gap-2 mb-2 font-semibold text-gray-700">
                        <div className="flex-1">Skill Group</div>
                        <div className="flex-1">Skills (comma-separated)</div>
                        <div className="w-8"></div>
                    </div>

                    {Object.entries(groupedSkills).map(([groupName, skillsInGroup]) => (
                        <div key={groupName} className="flex gap-2 mb-2 items-center">
                            <div className="basis-1/3">
                                <Input
                                    type="text"
                                    value={inputValues[groupName] ?? groupName}
                                    onChange={(e) => setInputValues(prev => ({ ...prev, [groupName]: e.target.value }))}
                                    onBlur={(e) => handleGroupNameBlur(groupName, e.target.value)}
                                    placeholder="Skill Group Name"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            e.currentTarget.blur();
                                        }
                                    }}
                                />
                            </div>
                            <div className="basis-2/3">
                                <Input
                                    type="text"
                                    value={inputValues[`skills-${groupName}`] ?? skillsInGroup.map(s => s.name).join(', ')}
                                    onChange={(e) => setInputValues(prev => ({ ...prev, [`skills-${groupName}`]: e.target.value }))}
                                    onBlur={(e) => handleSkillsStringChange(groupName, e.target.value)}
                                    placeholder="e.g., React, JavaScript, TypeScript"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            e.currentTarget.blur();
                                        }
                                    }}
                                />
                            </div>
                            <Button type="secondary" onClick={() => handleRemoveGroup(groupName)} htmlType="button" className="flex-shrink-0">
                                -
                            </Button>
                        </div>
                    ))}

                    <div className="flex justify-end mt-4">
                        <Button type="secondary" onClick={handleAddGroup} htmlType="button">
                            + Add Group
                        </Button>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="secondary" onClick={onCancel} htmlType="button">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType={"submit"}>
                            Save changes
                        </Button>
                    </div>
                </form>
            </ContentCard>
        </Modal>
    );
};