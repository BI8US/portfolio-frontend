import {ResumeHeaderItem} from "./resumeHeaderTypes"
import {EducationItem} from "./educationTypes";
import {MediaLinkItem} from "./mediaLinkTypes";
import {ProjectItem} from "./projectTypes";
import {SkillItem} from "./skillTypes";
import {WorkExperienceItem} from "./workExperienceTypes";

export interface ResumeListItem {
    id: number;
    resumeName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ResumeItem {
    id: number;
    resumeName: string;
    isActive: boolean;
    fullName?: string;
    email?: string;
    phone?: string;
    picture?: string;
    summary?: string;
    createdAt: Date;
    updatedAt: Date;
    educations?: EducationItem[];
    mediaLinks?: MediaLinkItem[];
    projects?: ProjectItem[];
    skills?: SkillItem[];
    workExperiences?: WorkExperienceItem[];
}
