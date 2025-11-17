import React from "react";
import {ResumeItem} from "../../types/resumeTypes";
import {ResumeCardMediaLinks} from "./ResumeCardMediaLinks";
import {ContentCard} from "../common/ContentCard";
import {Button} from "../common/Button";
import {toast} from 'sonner'

interface ResumeCardProps {
    resume: ResumeItem;
    onEditClick?: () => void;
}

export const ResumeCardHeader: React.FC<ResumeCardProps> = ({ resume, onEditClick }) => {

    const handleCopyToClipboard = (text: string | undefined) => {
        if (!text) return;

        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success(`"${text}" copied to clipboard!`);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <>
            <ContentCard>
                <div className="flex flex-col md:flex-row justify-between items-start w-full">
                    {resume.picture && (
                        <div className="w-28 h-28 rounded-full border-2 border-border mr-6 overflow-hidden flex-shrink-0">
                            <img
                                src={resume.picture}
                                alt={resume.fullName}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="flex-1">
                            <h2 className="text-2xl font-bold text-text-primary">{resume.fullName}</h2>
                            {resume.intro && (
                                <p className="text-text-secondary italic mb-2">{resume.intro}</p>
                            )}
                        <div className="flex flex-wrap text-text-secondary mt-2 gap-2">
                            {resume.mediaLinks && (
                                <ResumeCardMediaLinks mediaLinks={resume.mediaLinks}/>
                            )}
                            {resume.email && (
                                <button
                                    type="button"
                                    onClick={() => handleCopyToClipboard(resume.email)}
                                    className='flex items-center gap-1 border border-border p-2 rounded-full text-text-secondary hover:bg-border active:bg-border'
                                >
                                    <span className="material-symbols-outlined">mail</span>
                                    {resume.email}
                                </button>
                            )}
                            {resume.phone && (
                                <button
                                    type="button"
                                    onClick={() => handleCopyToClipboard(resume.phone)}
                                    className='flex items-center gap-1 border border-border p-2 rounded-full text-text-secondary hover:bg-border active:bg-border'
                                >
                                    <span className="material-symbols-outlined">call</span>
                                    {resume.phone}
                                </button>
                            )}
                            {resume.location && (
                                <p className='flex items-center gap-1 border border-border p-2 rounded-full hover:bg-border'>
                                    <span className="material-symbols-outlined">location_on</span>
                                    {resume.location}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </ContentCard>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-text-primary text-2xl">person</span>
                    <h2 className="text-2xl font-bold text-text-primary">About me</h2>
                </div>
                <span>
                    {onEditClick && (
                        <Button
                            type="secondary"
                            onClick={onEditClick}
                            className="px-3 py-1 border-transparent bg-page"
                        >
                            <span className="material-symbols-outlined text-2xl">edit</span>
                        </Button>
                    )}
                </span>
            </div>
            <ContentCard>
                {resume.summary && (
                    <p className="text-text-secondary whitespace-pre-line">{resume.summary}</p>
                )}
            </ContentCard>
        </>
    );
};
