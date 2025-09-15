import React from "react";
import {MediaLinkItem} from "../types/mediaLinkTypes";
import {FaGithub, FaLinkedin, FaGlobe} from "react-icons/fa";
import {IconType} from "react-icons";

export interface ResumeCardMediaLinksProps {
    mediaLinks: MediaLinkItem[];
}

export const ResumeCardMediaLinks = ({ mediaLinks }: ResumeCardMediaLinksProps) => {
    const iconMap: Record<string, IconType> = {
        GitHub: FaGithub,
        LinkedIn: FaLinkedin,
    };

    const getIcon = (name: string): JSX.Element => {
        const IconComponent = (iconMap[name] || FaGlobe) as React.ComponentType;
        return <IconComponent />;
    };

    return (
        <div className="flex gap-4 mt-2">
            {mediaLinks.map((item) => (
                <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                >
                    {getIcon(item.name)}
                    <span>{item.name}</span>
                </a>
            ))}
        </div>
    );
};