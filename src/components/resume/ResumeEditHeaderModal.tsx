import React from 'react';

import { MediaLinkItemPartial } from '../../types/mediaLinkTypes';
import { ResumeHeaderItemPartial } from '../../types/resumeHeaderTypes';
import { ResumeItem } from '../../types/resumeTypes';
import { Button } from '../common/Button';
import { ContentCard } from '../common/ContentCard';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';

export interface Payload {
    header: ResumeHeaderItemPartial;
    mediaLinks: MediaLinkItemPartial[];
}

interface ResumeEditFormHeaderProps {
    resumeItem: ResumeItem;
    onSubmit: (payload: Payload) => void;
    onCancel: () => void;
}

export const ResumeEditHeaderModal: React.FC<ResumeEditFormHeaderProps> = ({
    resumeItem,
    onSubmit,
    onCancel,
}) => {
    const [resumeName, setResumeName] = React.useState(resumeItem.resumeName || '');
    const [fullName, setFullName] = React.useState(resumeItem.fullName || '');
    const [intro, setIntro] = React.useState(resumeItem.intro || '');
    const [location, setLocation] = React.useState(resumeItem.location || '');
    const [email, setEmail] = React.useState(resumeItem.email || '');
    const [phone, setPhone] = React.useState(resumeItem.phone || '');
    const [summary, setSummary] = React.useState(resumeItem.summary || '');
    const [isActive, setIsActive] = React.useState(resumeItem.isActive);
    const [mediaLinks, setMediaLinks] = React.useState<MediaLinkItemPartial[]>(
        resumeItem.mediaLinks || [],
    );

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
        // TODO implement at least a field for this in interface
        const picture = '/images/avatar.png';

        const payload: Payload = {
            header: {
                resumeName,
                fullName,
                email,
                phone,
                picture,
                summary,
                isActive,
                intro,
                location,
            },
            mediaLinks: mediaLinks,
        };

        onSubmit(payload);
    };

    return (
        <Modal>
            <ContentCard>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-semibold mb-2 text-text-primary">Edit header</h2>

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
                    <Input
                        textarea
                        label="Intro"
                        placeholder="A short intro"
                        value={intro}
                        onChange={(e) => setIntro(e.target.value)}
                        rows={2}
                    />
                    <h3 className="mb-1 font-medium text-text-secondary">Media Links</h3>

                    {mediaLinks.map((link, index) => (
                        <div key={index} className="flex gap-2 mb-2 items-center">
                            <div className="basis-1/3">
                                <Input
                                    type="text"
                                    placeholder="Media"
                                    value={link.name}
                                    onChange={(e) =>
                                        handleLinkChange(index, 'name', e.target.value)
                                    }
                                    className="mb-0"
                                />
                            </div>
                            <div className="basis-2/3">
                                <Input
                                    type="text"
                                    placeholder="URL"
                                    value={link.link}
                                    onChange={(e) =>
                                        handleLinkChange(index, 'link', e.target.value)
                                    }
                                    className="mb-0"
                                />
                            </div>
                            <Button
                                type="danger"
                                onClick={() => handleRemoveLink(index)}
                                htmlType="button"
                                className="border-transparent"
                            >
                                <span className="material-symbols-outlined text-2xl">delete</span>
                            </Button>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <Button
                            type="secondary"
                            onClick={handleAddLink}
                            htmlType="button"
                            className="flex items-center"
                        >
                            <span className="material-symbols-outlined text-2xl">add_2</span>
                        </Button>
                    </div>
                    <Input
                        type="email"
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
                        type="text"
                        label="Location"
                        placeholder="City, Country"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <Input
                        textarea
                        label="Summary (Markdown supported)"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        rows={4}
                    />

                    <label className="flex items-center gap-2 mb-2 text-text-primary">
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
                        <Button type="primary">Save changes</Button>
                    </div>
                </form>
            </ContentCard>
        </Modal>
    );
};
