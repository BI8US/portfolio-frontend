import React from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useGetResumeById, useUpdateHeader, useUpdateMediaLinks} from "../hooks/useResume";
import {ResumeEditFormHeader} from "../components/ResumeEditFormHeader";
import {ResumeHeaderItemPartial} from "../types/resumeHeaderTypes";
import {ResumeEditFormMediaLinks} from "../components/ResumeEditFormMediaLinks";
import {MediaLinkItemPartial} from "../types/mediaLinkTypes";
import {ContentPage} from "../components/ContentPage";

export const ResumeEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: resume, isLoading } = useGetResumeById(Number(id));
    const updateHeaderMutation = useUpdateHeader();
    const updateMediaLinksMutation = useUpdateMediaLinks();

    if (isLoading) return <p>Loading resume...</p>;
    if (!resume) return <p>Resume not found</p>;

    const handleHeaderSubmit = (partial: ResumeHeaderItemPartial) => {
        updateHeaderMutation.mutate(
            { id: Number(id), partial },
            {
                onSuccess: () => {},
            }
        );
    };

    const handleMediaLinksSubmit = (mediaLinks: MediaLinkItemPartial[]) => {
        updateMediaLinksMutation.mutate(
            { id: Number(id), mediaLinks },
            {
                onSuccess: () => {}
            }
        );
    };

    return (
        <ContentPage>
            <ResumeEditFormHeader resumeItem={resume} onSubmit={handleHeaderSubmit} />
            <ResumeEditFormMediaLinks mediaLinks={resume.mediaLinks} onSubmit={handleMediaLinksSubmit} />
        </ContentPage>
    );
};