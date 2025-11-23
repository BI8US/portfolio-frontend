import React from 'react';
import {Snake} from '../components/games/Snake'
import {ContentPage} from "../components/common/ContentPage";
import {ContentCard} from "../components/common/ContentCard";

export const TestSnakePage: React.FC = () => {
    return (
        <ContentPage>
            <h1 className="text-2xl font-bold text-text-primary mb-4">Snake Game Test</h1>
            <ContentCard>
                <Snake />
            </ContentCard>
        </ContentPage>
    );
};