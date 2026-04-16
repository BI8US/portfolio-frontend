import React from 'react';

export interface SortButtonsProps {
    onMoveUp: () => void;
    onMoveDown: () => void;
    disableUp: boolean;
    disableDown: boolean;
    className?: string;
    layout?: 'col' | 'row';
}

export const SortButtons: React.FC<SortButtonsProps> = ({
    onMoveUp,
    onMoveDown,
    disableUp,
    disableDown,
    className = '',
    layout = 'col',
}) => {
    return (
        <div className={`flex ${layout === 'row' ? 'flex-row' : 'flex-col'} ${className}`}>
            <button
                type="button"
                onClick={onMoveUp}
                disabled={disableUp}
                className="text-text-muted hover:text-text-accent disabled:opacity-30 transition-colors flex items-center justify-center p-1"
                title="Move up"
            >
                <span className="material-symbols-outlined text-xl leading-none">
                    keyboard_arrow_up
                </span>
            </button>
            <button
                type="button"
                onClick={onMoveDown}
                disabled={disableDown}
                className="text-text-muted hover:text-text-accent disabled:opacity-30 transition-colors flex items-center justify-center p-1"
                title="Move down"
            >
                <span className="material-symbols-outlined text-xl leading-none">
                    keyboard_arrow_down
                </span>
            </button>
        </div>
    );
};
