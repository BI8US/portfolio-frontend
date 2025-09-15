import React, { useState, useEffect } from "react";
import { MediaLinkItemPartial } from "../types/mediaLinkTypes";

interface MediaLinkFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (link: MediaLinkItemPartial) => void;
    linkToEdit?: MediaLinkItemPartial;
}

export const MediaLinkFormModal: React.FC<MediaLinkFormModalProps> = ({ isOpen, onClose, onSave, linkToEdit }) => {
    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        if (linkToEdit) {
            setName(linkToEdit.name || "");
            setLink(linkToEdit.link || "");
        } else {
            setName("");
            setLink("");
        }
    }, [linkToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...linkToEdit, name, link });
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{linkToEdit ? "Edit Link" : "Add New Link"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Link Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">URL</label>
                        <input
                            type="url"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};