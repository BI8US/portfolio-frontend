import React from 'react';
import {Snake} from '../components/games/Snake'
import {ContentPage} from "../components/common/ContentPage";
import {ContentCard} from "../components/common/ContentCard";

export const TestSnakePage: React.FC = () => {
    return (
        <ContentPage>
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">

                <div className="text-center mb-6 max-w-lg">
                    <h2 className="text-2xl font-bold text-text-primary mb-4">
                        Snake Game
                    </h2>

                    <p className="text-text-secondary text-lg leading-relaxed">
                        This game was originally created for the <strong>loading screen</strong>.
                        <br />
                        This usually takes about <span className="font-semibold text-text-primary">30-50 seconds</span>.
                    </p>

                    <p className="text-text-accent font-medium mt-4">
                        Here it is available <strong>just for fun</strong>!
                    </p>
                </div>
                <ContentCard className="w-auto flex justify-center py-8 shadow-2xl border-2 border-border">
                    <Snake />
                </ContentCard>
            </div>
        </ContentPage>
    );
};