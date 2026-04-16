import React from 'react';

import { MediaLinkItem, ResumeResponse, UpdateHeaderDto } from '../../../types/resume';
import { moveItemInArray } from '../../../utils/sortUtils';
import { Button } from '../../common/Button';
import { ContentCard } from '../../common/ContentCard';
import { Input } from '../../common/Input';
import { Modal } from '../../common/Modal';
import { SortButtons } from '../../common/SortButtons';

interface ResumeEditHeaderModalProps {
    resumeItem: ResumeResponse;
    onSubmit: (payload: UpdateHeaderDto) => void;
    onCancel: () => void;
}

export const ResumeEditHeaderModal: React.FC<ResumeEditHeaderModalProps> = ({
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
    const [mediaLinks, setMediaLinks] = React.useState<MediaLinkItem[]>(
        resumeItem.mediaLinks || [],
    );

    const handleLinkChange = (index: number, key: keyof MediaLinkItem, value: string) => {
        const updatedLinks = [...mediaLinks];
        updatedLinks[index] = { ...updatedLinks[index], [key]: value };
        setMediaLinks(updatedLinks);
    };

    const handleAddLink = () => {
        setMediaLinks([...mediaLinks, { name: '', link: '', sortOrder: mediaLinks.length }]);
    };

    const handleRemoveLink = (index: number) => {
        const updatedLinks = mediaLinks
            .filter((_, i) => i !== index)
            .map((link, i) => ({ ...link, sortOrder: i }));
        setMediaLinks(updatedLinks);
    };

    const handleMoveLink = (index: number, direction: 'up' | 'down') => {
        setMediaLinks(moveItemInArray(mediaLinks, index, direction));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const picture = '/images/avatar.png';

        const payload: UpdateHeaderDto = {
            resumeName,
            fullName,
            email,
            phone,
            picture,
            summary,
            isActive,
            intro,
            location,
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

                    <h3 className="mb-2 font-medium text-text-secondary">Media Links</h3>
                    <div className="space-y-2 mb-4">
                        {mediaLinks.map((link, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <SortButtons
                                    onMoveUp={() => handleMoveLink(index, 'up')}
                                    onMoveDown={() => handleMoveLink(index, 'down')}
                                    disableUp={index === 0}
                                    disableDown={index === mediaLinks.length - 1}
                                />
                                <div className="basis-1/3">
                                    <Input
                                        type="text"
                                        placeholder="Media (e.g. GitHub)"
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
                                    className="border-transparent p-1"
                                >
                                    <span className="material-symbols-outlined text-2xl">
                                        delete
                                    </span>
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mb-4">
                        <Button
                            type="secondary"
                            onClick={handleAddLink}
                            htmlType="button"
                            className="flex items-center"
                        >
                            <span className="material-symbols-outlined text-2xl">add</span>
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

                    <label className="flex items-center gap-2 mb-2 text-text-primary cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="w-4 h-4"
                        />
                        Active
                    </label>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button type="secondary" onClick={onCancel}>
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
