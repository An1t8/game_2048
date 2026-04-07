import { useState, useCallback } from 'react';
import type { Board, Direction, GameStatus } from '../types';
import { moveBoard, addRandomTile, canMove, hasWon } from '../utils/gameLogic';
import { getBestScore, saveBestScore } from '../utils/storage';
import { EMPTY_BOARD } from '../data/initialState';

function initBoard(): Board {
    let board = [...EMPTY_BOARD] as Board;
    board = addRandomTile(board);
    board = addRandomTile(board);
    return board;
}

export function useGame() {
    const [board, setBoard] = useState<Board>(initBoard);
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(getBestScore);
    const [status, setStatus] = useState<GameStatus>('playing');

    const move = useCallback((direction: Direction) => {
        if (status !== 'playing') return;

        setBoard(prev => {
            const { newBoard, score: gained } = moveBoard(prev, direction);

            if (newBoard.join() === prev.join()) return prev;

            setScore(s => {
                const newScore = s + gained;
                setBest(b => {
                    if (newScore > b) {
                        saveBestScore(newScore);
                        return newScore;
                    }
                    return b;
                });
                return newScore;
            });

            const withTile = addRandomTile(newBoard);

            if (hasWon(withTile)) setStatus('won');
            else if (!canMove(withTile)) setStatus('lost');

            return withTile;
        });
    }, [status]);

    const restart = useCallback(() => {
        setBoard(initBoard());
        setScore(0);
        setStatus('playing');
    }, []);

    return { board, score, best, status, move, restart };
}