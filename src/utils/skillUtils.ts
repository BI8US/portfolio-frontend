import { SkillItem, SkillItemPartial } from '../types/skillTypes';

interface GroupedSkillsList {
    [key: string]: (SkillItem | SkillItemPartial)[];
}

interface GroupedSkillNamesList {
    [key: string]: string[];
}

export const getGroupedSkills = (skills: (SkillItem | SkillItemPartial)[]) => {
    return skills.reduce((acc, item) => {
        const groupName = item.skillGroup;
        if (!acc[groupName]) {
            acc[groupName] = [];
        }
        acc[groupName].push(item);
        return acc;
    }, {} as GroupedSkillsList);
};

export const getGroupedSkillsNames = (skills: (SkillItem | SkillItemPartial)[]) => {
    return skills.reduce((acc, item) => {
        const groupName = item.skillGroup || 'General';
        if (!acc[groupName]) {
            acc[groupName] = [];
        }
        acc[groupName].push(item.name);
        return acc;
    }, {} as GroupedSkillNamesList);
};
