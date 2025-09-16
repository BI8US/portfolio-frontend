import React, {useState, useEffect} from "react";
import {ResumeItem} from "../types/resumeTypes";
import {ResumeHeaderItemPartial} from "../types/resumeHeaderTypes";
import {ContentCard} from "./ContentCard";
import {Input} from "./Input";
import {Button} from "./Button";
import {MediaLinkItemPartial} from "../types/mediaLinkTypes";

export interface Payload {
    header: ResumeHeaderItemPartial;
    mediaLinks: MediaLinkItemPartial[];
}

interface ResumeEditFormHeaderProps {
    isOpen: boolean;
    resumeItem: ResumeItem;
    onSubmit: (payload: Payload) => void;
    onCancel: () => void;
}

export const ResumeEditHeaderModal: React.FC<ResumeEditFormHeaderProps> = ({isOpen, resumeItem, onSubmit, onCancel
}) => {
    const [resumeName, setResumeName] = useState(resumeItem.resumeName || "");
    const [fullName, setFullName] = useState(resumeItem.fullName || "");
    const [email, setEmail] = useState(resumeItem.email || "");
    const [phone, setPhone] = useState(resumeItem.phone || "");
    const [summary, setSummary] = useState(resumeItem.summary || "");
    const [isActive, setIsActive] = useState(resumeItem.isActive);
    const [mediaLinks, setMediaLinks] = useState<MediaLinkItemPartial[]>(resumeItem.mediaLinks || []);

    useEffect(() => {
        setResumeName(resumeItem.resumeName || "");
        setFullName(resumeItem.fullName || "");
        setEmail(resumeItem.email || "");
        setPhone(resumeItem.phone || "");
        setSummary(resumeItem.summary || "");
        setIsActive(resumeItem.isActive);
        setMediaLinks(resumeItem.mediaLinks || []);
    }, [resumeItem]);

    const handleLinkChange = (index: number, key: keyof MediaLinkItemPartial, value: string) => {
        const updatedLinks = [...mediaLinks];
        updatedLinks[index] = { ...updatedLinks[index], [key]: value };
        setMediaLinks(updatedLinks);
    };

    const handleAddLink = () => {
        setMediaLinks([...mediaLinks, { name: '', link: '' }]);
    };

    const handleRemoveLink = (index: number) => {
        const updatedLinks = mediaLinks.filter((_, i) => i !== index);
        setMediaLinks(updatedLinks);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: Payload = {
            header: {
                resumeName,
                fullName,
                email,
                phone,
                summary,
                isActive,
                },
            mediaLinks: mediaLinks
        };

        onSubmit(payload);
    };

    if (!isOpen) {return null}

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <ContentCard className="w-full max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-semibold mb-2">Edit resume</h2>

                    <Input
                        type="text"
                        label="Resume name"
                        placeholder="Resume name"
                        value={resumeName}
                        onChange={(e) => setResumeName(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        label="Full name"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <h3 className="mb-1 font-medium text-gray-700">Media Links</h3>

                    {mediaLinks.map((link, index) => (
                        <div key={index} className="flex gap-2 mb-2 items-start">
                            <Input
                                type="text"
                                placeholder="Media"
                                value={link.name}
                                onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="URL"
                                value={link.link}
                                onChange={(e) => handleLinkChange(index, 'link', e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveLink(index)}
                                className="w-8 h-8 text-2xl font-semiboldbold rounded-full bg-gray-200 hover:bg-red-400 hover:text-white text-gray-600 flex-shrink-0 items-center justify-center transition-colors duration-200"
                                aria-label="Remove link"
                            >
                                -
                            </button>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleAddLink}
                            className="w-8 h-8 text-xl font-semiboldbold rounded-full bg-gray-200 hover:bg-green-500 hover:text-white text-gray-600 flex items-center justify-center transition-colors duration-200"
                            aria-label="Add new link"
                        >
                            +
                        </button>
                    </div>
                    <Input type="email"
                        label="Email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="text"
                        label="Phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <Input
                        textarea
                        label="Summary"
                        placeholder="Summary"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />

                    <label className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        Active
                    </label>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="primary">
                            Save changes
                        </Button>
                    </div>
                </form>
            </ContentCard>
        </div>
    );
};