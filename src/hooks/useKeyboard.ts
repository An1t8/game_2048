import { useEffect } from 'react';
import type { Direction } from '../types';

export function useKeyboard(onMove: (direction: Direction) => void) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            const map: Record<string, Direction> = {
                ArrowLeft: 'left',
                ArrowRight: 'right',
                ArrowUp: 'up',
                ArrowDown: 'down',
            };

            if (map[e.key]) {
                e.preventDefault();
                onMove(map[e.key]);
            }
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onMove]);
}