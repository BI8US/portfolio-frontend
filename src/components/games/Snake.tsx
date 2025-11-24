import React from 'react';
import { Button } from '../common/Button';

const GRID_SIZE = 15;
const SPEED = 150;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const ControlBtn = React.memo(({ onClick, icon, disabled }: { onClick: () => void, icon: string, disabled: boolean }) => (
    <Button
        type="secondary"
        className={`
            w-16 h-16 !p-0 flex items-center justify-center
            pointer-events-auto 
        `}
        onPointerDown={(e) => {
            e.preventDefault();
            if (!disabled) onClick();
        }}
    >
        <span className="material-symbols-outlined text-3xl">{icon}</span>
    </Button>
));


export const Snake: React.FC = () => {
    const [snake, setSnake] = React.useState<Point[]>([{ x: 1, y: 1 }]);
    const [food, setFood] = React.useState<Point>({ x: 10, y: 10 });
    const directionRef = React.useRef<Direction>('RIGHT');
    const nextDirectionRef = React.useRef<Direction>('RIGHT');
    const [isGameOver, setIsGameOver] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [highScore, setHighScore] = React.useState(() => {
        return parseInt(localStorage.getItem('snake_highscore') || '0');
    });

    const gameLoopRef = React.useRef<NodeJS.Timeout | null>(null);

    const spawnFood = React.useCallback(() => {
        let newFood: Point;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
            const onSnake = snake.some(s => s.x === newFood.x && s.y === newFood.y);
            if (!onSnake) break;
        }
        setFood(newFood);
    }, [snake]);

    const resetGame = () => {
        setSnake([{ x: 1, y: 1 }]);
        directionRef.current = 'RIGHT';
        nextDirectionRef.current = 'RIGHT';
        setScore(0);
        setIsGameOver(false);
        setIsPlaying(true);
        spawnFood();
    };

    const changeDirection = React.useCallback((newDir: Direction) => {
        const currentDir = directionRef.current;

        if (currentDir === 'UP' && newDir === 'DOWN') return;
        if (currentDir === 'DOWN' && newDir === 'UP') return;
        if (currentDir === 'LEFT' && newDir === 'RIGHT') return;
        if (currentDir === 'RIGHT' && newDir === 'LEFT') return;

        nextDirectionRef.current = newDir;
    }, []);

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
                e.preventDefault();
            }
            switch (e.key) {
                case 'ArrowUp': case 'w': case 'W': case 'ц': case 'Ц':
                    changeDirection('UP');
                    break;
                case 'ArrowDown': case 's': case 'S': case 'ы': case 'Ы':
                    changeDirection('DOWN');
                    break;
                case 'ArrowLeft': case 'a': case 'A': case 'ф': case 'Ф':
                    changeDirection('LEFT');
                    break;
                case 'ArrowRight': case 'd': case 'D': case 'в': case 'В':
                    changeDirection('RIGHT');
                    break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [changeDirection]);

    React.useEffect(() => {
        if (!isPlaying || isGameOver) return;

        const moveSnake = () => {
            directionRef.current = nextDirectionRef.current;
            const dir = directionRef.current;

            setSnake((prevSnake) => {
                const head = prevSnake[0];
                const newHead = { ...head };

                switch (dir) {
                    case 'UP': newHead.y -= 1; break;
                    case 'DOWN': newHead.y += 1; break;
                    case 'LEFT': newHead.x -= 1; break;
                    case 'RIGHT': newHead.x += 1; break;
                }

                if (
                    newHead.x < 0 || newHead.x >= GRID_SIZE ||
                    newHead.y < 0 || newHead.y >= GRID_SIZE ||
                    prevSnake.some((s) => s.x === newHead.x && s.y === newHead.y)
                ) {
                    setIsGameOver(true);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                if (newHead.x === food.x && newHead.y === food.y) {
                    const newScore = score + 1;
                    setScore(newScore);
                    if (newScore > highScore) {
                        setHighScore(newScore);
                        localStorage.setItem('snake_highscore', newScore.toString());
                    }
                    spawnFood();
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        gameLoopRef.current = setInterval(moveSnake, SPEED);
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [food, isGameOver, isPlaying, spawnFood, score, highScore]);


    const renderGrid = () => {
        return Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnakeHead = snake[0].x === x && snake[0].y === y;
            const isSnakeBody = snake.slice(1).some(s => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            let cellClass = "w-full h-full rounded-sm transition-all duration-100 ";
            if (isSnakeHead) cellClass += "bg-button-primary rounded-md";
            else if (isSnakeBody) cellClass += "bg-button-primary/60";
            else if (isFood) cellClass += "bg-text-danger !rounded-full scale-75";
            else cellClass += "bg-border/20";

            return <div key={`${x}-${y}`} className={cellClass} />;
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="relative p-2 bg-content border-2 border-border rounded-3xl shadow-lg">
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                    <div className="bg-page/50 px-2 py-1 rounded-3xl border border-border text-xs font-mono text-text-secondary shadow-sm">
                        BEST: {highScore}
                    </div>
                </div>
                <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <div className="bg-page/50 px-2 py-1 rounded-3xl border border-border text-xs font-mono font-bold text-text-primary shadow-sm">
                        SCORE: {score}
                    </div>
                </div>
                <div
                    className="grid gap-0.5 w-[300px] h-[300px]"
                    style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
                >
                    {renderGrid()}
                </div>

                {(!isPlaying || isGameOver) && (
                    <div className="absolute inset-0 bg-page/50 flex flex-col items-center justify-center rounded-3xl backdrop-blur-sm z-20">
                        {isGameOver && (
                            <div className="text-text-primary text-2xl font-bold mb-2">
                                Game Over!
                            </div>
                        )}
                        <div className="text-text-primary text-lg">Score: {score}</div>
                        <div className="text-text-primary font-medium mb-6 text-lg">Best: {highScore}</div>

                        <Button
                            type="primary"
                            onClick={resetGame}
                        >
                            {isGameOver ? 'Try Again' : 'Start Game'}
                        </Button>

                        <p className="text-text-secondary text-xs mt-4 opacity-75">
                            Use WASD, Arrow Keys or Buttons to move
                        </p>
                    </div>
                )}
            </div>

            <div className={`mt-6 grid grid-cols-3 gap-3 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <div />
                <ControlBtn onClick={() => changeDirection('UP')} icon="arrow_upward" disabled={!isPlaying || isGameOver} />
                <div />

                <ControlBtn onClick={() => changeDirection('LEFT')} icon="arrow_back" disabled={!isPlaying || isGameOver} />
                <ControlBtn onClick={() => changeDirection('DOWN')} icon="arrow_downward" disabled={!isPlaying || isGameOver} />
                <ControlBtn onClick={() => changeDirection('RIGHT')} icon="arrow_forward" disabled={!isPlaying || isGameOver} />
            </div>
        </div>
    );
};