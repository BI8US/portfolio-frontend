import React, { useState, useEffect } from "react";
import { ResumeItem, ResumeItemPartial } from "../types/resumeTypes";

interface ResumeFormProps {
    resumeEditItem?: ResumeItem;
    onSubmit: (resume: ResumeItemPartial) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({
                                                          resumeEditItem,
                                                          onSubmit,
                                                      }) => {
    const isEditForm = !!resumeEditItem;
    const title = isEditForm ? "Edit resume" : "Create new resume";

    const [resumeName, setResumeName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [summary, setSummary] = useState("");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (resumeEditItem) {
            setResumeName(resumeEditItem.resumeName || "");
            setFullName(resumeEditItem.fullName || "");
            setEmail(resumeEditItem.email || "");
            setPhone(resumeEditItem.phone || "");
            setSummary(resumeEditItem.summary || "");
            setIsActive(!!resumeEditItem.isActive);
        }
    }, [resumeEditItem]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: ResumeItemPartial = {
            resumeName,
            fullName,
            email,
            phone: phone || undefined,
            summary,
            isActive,
        };

        onSubmit(payload);

        if (!isEditForm) {
            setResumeName("");
            setFullName("");
            setEmail("");
            setPhone("");
            setSummary("");
            setIsActive(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>

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
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mb-2 rounded"
                required
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
                required
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
                {isEditForm ? "Save changes" : "Create resume"}
            </button>
        </form>
    );
};
