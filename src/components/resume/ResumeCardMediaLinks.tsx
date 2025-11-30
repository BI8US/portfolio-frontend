import React from 'react';
import { IconType } from 'react-icons';
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';

import { MediaLinkItem } from '../../types/mediaLinkTypes';

export interface ResumeCardMediaLinksProps {
    mediaLinks: MediaLinkItem[];
}

export const ResumeCardMediaLinks = ({ mediaLinks }: ResumeCardMediaLinksProps) => {
    const iconMap: Record<string, IconType> = {
        GitHub: FaGithub,
        LinkedIn: FaLinkedin,
    };

    const getIcon = (name: string) => {
        const IconComponent = iconMap[name] ?? FaGlobe;
        return React.createElement(IconComponent as React.ComponentType<{ className?: string }>, {
            className: 'text-xl',
        });
    };

    return (
        <>
            {mediaLinks.map((item) => (
                <a
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 border border-border p-2 rounded-full hover:bg-border"
                >
                    {getIcon(item.name)}
                    <span>{item.name}</span>
                </a>
            ))}
        </>
    );
};
