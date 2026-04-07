import { useEffect, useRef } from 'react';
import type { Direction } from '../types';

export function useSwipe(onMove: (direction: Direction) => void) {
    const touchStart = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStart.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStart.current) return;

            const dx = e.changedTouches[0].clientX - touchStart.current.x;
            const dy = e.changedTouches[0].clientY - touchStart.current.y;

            if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;

            if (Math.abs(dx) > Math.abs(dy)) {
                onMove(dx > 0 ? 'right' : 'left');
            } else {
                onMove(dy > 0 ? 'down' : 'up');
            }

            touchStart.current = null;
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [onMove]);
}
