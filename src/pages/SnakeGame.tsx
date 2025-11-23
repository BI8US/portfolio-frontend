import React from 'react';
import {Snake} from '../components/games/Snake'
import {ContentPage} from "../components/common/ContentPage";
import {ContentCard} from "../components/common/ContentCard";

export const TestSnakePage: React.FC = () => {
    return (
        <ContentPage>
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-text-primary">Snake Game</h1>
            </div>
            <ContentCard>
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="max-w-2xl text-text-secondary space-y-2 text-lg">
                        <p>
                            This game was originally created for the <strong>loading screen</strong>.
                        </p>
                        <p>
                            Since I use a free tier, the database goes to &laquo;sleep&raquo; after some time of inactivity.
                            To make the wait for the server wake-up less boring, I added this mini-game.
                        </p>
                        <p className="text-text-accent font-medium pt-2">
                            Here it is available <strong>just for fun</strong>!
                        </p>
                    </div>
                </div>
                <Snake />
            </ContentCard>
        </ContentPage>
    );
};