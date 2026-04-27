import { useEffect, useRef } from 'react';
import type { Direction } from '../types';
export function useSwipe(onMove: (direction: Direction) => void) {
    const touchStart = useRef<{ x: number; y: number } | null>(null);
    const touchProcessed = useRef(false);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStart.current = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };
            touchProcessed.current = false;
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!touchStart.current || touchProcessed.current) return;

            const dx = e.changedTouches[0].clientX - touchStart.current.x;
            const dy = e.changedTouches[0].clientY - touchStart.current.y;
            const threshold = 30;

            if (Math.abs(dx) < threshold && Math.abs(dy) < threshold) {
                touchStart.current = null;
                return;
            }

            if (Math.abs(dx) > Math.abs(dy)) {
                onMove(dx > 0 ? 'right' : 'left');
            } else {
                onMove(dy > 0 ? 'down' : 'up');
            }

            touchProcessed.current = true;
            touchStart.current = null;
            e.preventDefault();
        };

        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd, { passive: false });

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [onMove]);
}