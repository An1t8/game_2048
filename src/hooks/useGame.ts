import { useState, useCallback } from 'react';
import type { Board, Direction, GameStatus } from '../types';
import { moveBoard, addRandomTile, canMove, hasWon } from '../utils/gameLogic';
import { getBestScore, saveBestScore, getBoard, saveBoard, getScore, saveScore } from '../utils/storage';
import { EMPTY_BOARD } from '../data/initialState';

function freshBoard(): Board {
    let b = [...EMPTY_BOARD] as Board;
    b = addRandomTile(b);
    b = addRandomTile(b);
    return b;
}

function initBoard(): Board {
    const saved = getBoard();
    if (saved && saved.length === 16) return saved as Board;
    return freshBoard();
}

export function useGame() {
    const [board, setBoard] = useState<Board>(initBoard);
    const [score, setScore] = useState(getScore);
    const [best, setBest] = useState(getBestScore);
    const [status, setStatus] = useState<GameStatus>('playing');

    const move = useCallback((direction: Direction) => {
        if (status !== 'playing') return;

        setBoard(prev => {
            const { newBoard, score: gained } = moveBoard(prev, direction);
            if (newBoard.join() === prev.join()) return prev;

            setScore(s => {
                const newScore = s + gained;
                saveScore(newScore);
                setBest(b => {
                    if (newScore > b) { saveBestScore(newScore); return newScore; }
                    return b;
                });
                return newScore;
            });

            const withTile = addRandomTile(newBoard);
            saveBoard(withTile);

            if (hasWon(withTile)) setStatus('won');
            else if (!canMove(withTile)) setStatus('lost');

            return withTile;
        });
    }, [status]);

    const restart = useCallback(() => {
        const fresh = freshBoard();
        saveBoard(fresh);
        saveScore(0);
        setBoard(fresh);
        setScore(0);
        setStatus('playing');
    }, []);

    return { board, score, best, status, move, restart };
}