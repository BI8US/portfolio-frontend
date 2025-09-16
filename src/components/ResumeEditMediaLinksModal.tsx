import React, {useState, useEffect} from "react";
import {MediaLinkItem, MediaLinkItemPartial} from "../types/mediaLinkTypes";
import {MediaLinkFormModal} from "./MediaLinkFormModal";
import {ContentCard} from "./ContentCard";

interface ResumeEditFormMediaLinksProps {
    mediaLinks?: MediaLinkItem[];
    onSubmit: (mediaLinks: MediaLinkItemPartial[]) => void;
}

interface NewMediaLinkItem extends MediaLinkItemPartial {
    tempId: string;
}

type AllMediaLinkItems = MediaLinkItem | NewMediaLinkItem;

export const ResumeEditMediaLinksModal: React.FC<ResumeEditFormMediaLinksProps> = ({ mediaLinks = [], onSubmit }) => {
    const [currentLinks, setCurrentLinks] = useState<AllMediaLinkItems[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkToEdit, setLinkToEdit] = useState<AllMediaLinkItems | undefined>(undefined);
    const [tempIdCounter, setTempIdCounter] = useState(0);

    useEffect(() => {
        setCurrentLinks(mediaLinks);
    }, [mediaLinks]);

    const handleOpenModalForAdd = () => {
        setLinkToEdit(undefined);
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (link: AllMediaLinkItems) => {
        setLinkToEdit(link);
        setIsModalOpen(true);
    };

    const handleSaveLink = (savedLink: MediaLinkItemPartial) => {
        if (linkToEdit) {
            setCurrentLinks(prevLinks =>
                prevLinks.map(link => {
                    if ('id' in linkToEdit && 'id' in link && link.id === linkToEdit.id) {
                        return { ...savedLink, id: link.id } as MediaLinkItem;
                    }
                    if ('tempId' in linkToEdit && 'tempId' in link && link.tempId === linkToEdit.tempId) {
                        return { ...savedLink, tempId: link.tempId } as NewMediaLinkItem;
                    }
                    return link;
                })
            );
        } else {
            setCurrentLinks(prevLinks => [
                ...prevLinks,
                { ...savedLink, id: undefined, tempId: `new-${tempIdCounter}` } as NewMediaLinkItem,
            ]);
            setTempIdCounter(prevCounter => prevCounter + 1);
        }
    };

    const handleRemove = (key: number | string) => {
        setCurrentLinks(prevLinks => prevLinks.filter(item => {
            if ('id' in item) {
                return item.id !== key;
            } else {
                return item.tempId !== key;
            }
        }));
    };

    const handleFinalSave = () => {
        onSubmit(currentLinks.map(link => ({
            id: 'id' in link ? link.id : undefined,
            name: link.name,
            link: link.link
        } as MediaLinkItemPartial)));
    };

    return (
        <ContentCard>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Media Links</h2>
                <button
                    onClick={handleOpenModalForAdd}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Add link
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left">Link Name</th>
                        <th className="py-2 px-4 border-b text-left">URL</th>
                        <th className="py-2 px-4 border-b text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentLinks.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="py-4 text-center text-gray-500">No links added yet.</td>
                        </tr>
                    ) : (
                        currentLinks.map((item) => (
                            <tr key={'id' in item ? item.id : item.tempId}>
                                <td className="py-2 px-4 border-b">{item.name}</td>
                                <td className="py-2 px-4 border-b truncate max-w-xs">{item.link}</td>
                                <td className="py-2 px-4 border-b text-right space-x-2">
                                    <button
                                        onClick={() => handleOpenModalForEdit(item)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleRemove('id' in item ? item.id! : item.tempId)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            <button
                type="button"
                onClick={handleFinalSave}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
                Save all media links
            </button>

            <MediaLinkFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveLink}
                linkToEdit={linkToEdit}
            />
        </ContentCard>
    );
};