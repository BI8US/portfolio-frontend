import React from 'react';
import {Snake} from '../components/games/Snake'
import {ContentPage} from "../components/common/ContentPage";
import {ContentCard} from "../components/common/ContentCard";

export const TestSnakePage: React.FC = () => {
    return (
        <ContentPage>
            <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-text-primary text-2xl">sports_esports</span>
                <h2 className="text-2xl font-bold text-text-primary">Snake game</h2>
            </div>
                <ContentCard>
                    <Snake />
                </ContentCard>
        </ContentPage>
    );
};