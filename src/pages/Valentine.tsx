import React, { useEffect, useState } from 'react';

import { Button } from '../components/common/Button';

interface Heart {
    id: number;
    left: string;
    size: string;
    duration: string;
    delay: string;
}

export default function Valentine() {
    const [noCount, setNoCount] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [noPos, setNoPos] = useState({ x: 0, y: 0 });
    const [isDodging, setIsDodging] = useState(false);

    const [hearts, setHearts] = useState<Heart[]>([]);

    useEffect(() => {
        const newHearts = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 20 + 10}px`,
            duration: `${Math.random() * 4 + 4}s`,
            delay: `${Math.random() * 5}s`,
        }));
        setHearts(newHearts);
    }, []);

    const handleDodge = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setNoCount((prev) => prev + 1);
        setIsDodging(true);

        const newX = Math.floor(Math.random() * 60) + 10;
        const newY = Math.floor(Math.random() * 60) + 10;
        setNoPos({ x: newX, y: newY });
    };

    const getFinalMessage = () => {
        if (noCount === 0) return 'Ну и зачем я вообще делал эту убегающую кнопку?! 😅❤️';
        if (noCount <= 2) return 'Ого, ты так быстро сдалась 😏💕';
        if (noCount <= 5) return 'Ага, попалась! 🥰';
        if (noCount <= 10) return 'Ну ты и упрямая... Но я всё равно тебя люблю! 💘';
        return `Аж ${noCount} раз(а) попыталась! Ты вообще в курсе, что кнопка специально убегает? 😂❤️`;
    };

    const renderHearts = () => (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="absolute bottom-0 opacity-0 text-red-400/30 animate-float-up"
                    style={{
                        left: heart.left,
                        fontSize: heart.size,
                        animationDuration: heart.duration,
                        animationDelay: heart.delay,
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );

    if (accepted) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-fade-in relative"
                style={{ backgroundColor: 'var(--color-page)' }}
            >
                {renderHearts()}
                <div className="text-7xl mb-6 animate-bounce z-10 relative">🥰</div>
                <h1
                    className="text-4xl font-extrabold mb-4 z-10 relative"
                    style={{ color: 'rgb(var(--color-button-primary))' }}
                >
                    Урааа!
                </h1>
                <p
                    className="text-xl max-w-sm z-10 relative"
                    style={{ color: 'rgb(var(--color-text-primary))' }}
                >
                    {getFinalMessage()}
                </p>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden relative"
            style={{ backgroundColor: 'var(--color-page)' }}
        >
            {renderHearts()}

            <div className="text-7xl mb-6 z-10 relative">🥺👉👈</div>
            <h1
                className="text-3xl md:text-4xl font-extrabold mb-12 max-w-sm leading-tight z-10 relative"
                style={{ color: 'rgb(var(--color-text-primary))' }}
            >
                Никуся, ты будешь моей валентинкой?
            </h1>

            <div className="flex items-center justify-center gap-4 w-full max-w-sm relative h-20 z-10">
                <Button
                    type="primary"
                    htmlType="button"
                    onClick={() => setAccepted(true)}
                    className="z-10 transition-transform duration-300 shadow-xl"
                    style={{ transform: `scale(${1 + noCount * 0.1})` }}
                >
                    Да! ❤️
                </Button>

                <Button
                    type="danger"
                    htmlType="button"
                    onMouseEnter={handleDodge}
                    onTouchStart={handleDodge}
                    onClick={handleDodge}
                    className="z-20 shadow-md [-webkit-tap-highlight-color:transparent] touch-manipulation active:!bg-content active:!text-button-danger active:!border-button-danger hover:!bg-content hover:!text-button-danger hover:!border-button-danger"
                    style={
                        isDodging
                            ? {
                                  position: 'fixed',
                                  top: `${noPos.y}vh`,
                                  left: `${noPos.x}vw`,
                                  transition: 'top 0.2s ease, left 0.2s ease',
                              }
                            : { position: 'relative' }
                    }
                >
                    Нет 💔
                </Button>
            </div>
        </div>
    );
}
