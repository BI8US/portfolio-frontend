import React from "react";
import {useGetActiveResume} from "../hooks/useResume";
import { ResumeCard } from "../components/ResumeCard";


export default function ActiveResumePage() {
    const { data: resume, isLoading, error } = useGetActiveResume();

    return (
        <div className="max-w-2xl mx-auto p-4">
            {isLoading && <p>Loading...</p>}
            {error && <p>Loading error</p>}
            {resume && <ResumeCard key={resume.id} resume={resume} />}
        </div>
    );
}
