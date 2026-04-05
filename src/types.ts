export type TileValue = 0 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

export type Board = TileValue[];

export type Direction = 'up' | 'down' | 'left' | 'right';

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
    board: Board;
    score: number;
    bestScore: number;
    status: GameStatus;
}

export interface Tile {
    id: number;
    value: TileValue;
    row: number;
    col: number;
    isNew?: boolean;
    isMerged?: boolean;
}