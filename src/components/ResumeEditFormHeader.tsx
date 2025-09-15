import React, {useState, useEffect} from "react";
import {ResumeItem} from "../types/resumeTypes";
import {ResumeHeaderItemPartial} from "../types/resumeHeaderTypes";

interface ResumeEditFormHeaderProps {
    resumeItem: ResumeItem;
    onSubmit: (resume: ResumeHeaderItemPartial) => void;
}

export const ResumeEditFormHeader: React.FC<ResumeEditFormHeaderProps> = ({
                                                                              resumeItem,
                                                                              onSubmit,
                                                                          }) => {
    const [resumeName, setResumeName] = useState(resumeItem.resumeName || "");
    const [fullName, setFullName] = useState(resumeItem.fullName || "");
    const [email, setEmail] = useState(resumeItem.email || "");
    const [phone, setPhone] = useState(resumeItem.phone || "");
    const [summary, setSummary] = useState(resumeItem.summary || "");
    const [isActive, setIsActive] = useState(!!resumeItem.isActive);

    useEffect(() => {
        setResumeName(resumeItem.resumeName || "");
        setFullName(resumeItem.fullName || "");
        setEmail(resumeItem.email || "");
        setPhone(resumeItem.phone || "");
        setSummary(resumeItem.summary || "");
        setIsActive(!!resumeItem.isActive);
    }, [resumeItem]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: ResumeHeaderItemPartial = {
            resumeName,
            fullName,
            email,
            phone: phone || undefined,
            summary,
            isActive,
        };

        onSubmit(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2">Edit resume</h2>

            <input
                type="text"
                placeholder="Resume name"
                value={resumeName}
                onChange={(e) => setResumeName(e.target.value)}
                className="border p-2 w-full mb-2 rounded"
                required
            />
            <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border p-2 w-full mb-2 rounded"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mb-2 rounded"
            />
            <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border p-2 w-full mb-2 rounded"
            />
            <textarea
                placeholder="Summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="border p-2 w-full mb-2 rounded"
                rows={4}
            />

            <label className="flex items-center gap-2 mb-2">
                <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                />
                Active
            </label>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Save changes
            </button>
        </form>
    );
};