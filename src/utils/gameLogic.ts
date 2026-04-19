import type {Board, Direction, TileValue} from '../types';

export function slideRow(row: TileValue[]): TileValue[] {
    let filtered = row.filter(v => v !== 0) as TileValue[];
    for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
            filtered[i] = (filtered[i] * 2) as TileValue;
            filtered[i + 1] = 0;
        }
    }
    filtered = filtered.filter(v => v !== 0) as TileValue[];
    while (filtered.length < 4) filtered.push(0);
    return filtered;
}

export function moveBoard(board: Board, direction: Direction): { newBoard: Board; score: number } {
    const grid = [...board];
    let score = 0;

    const getRow = (r: number) => grid.slice(r * 4, r * 4 + 4) as TileValue[];
    const getCol = (c: number) => [grid[c], grid[4 + c], grid[8 + c], grid[12 + c]] as TileValue[];

    const calcScore = (before: TileValue[], after: TileValue[]) => {
        after.forEach((v, i) => { if (v !== before[i] && v !== 0) score += v; });
    };

    if (direction === 'left') {
        for (let r = 0; r < 4; r++) {
            const row = getRow(r);
            const slid = slideRow(row);
            calcScore(row, slid);
            slid.forEach((v, c) => { grid[r * 4 + c] = v; });
        }
    } else if (direction === 'right') {
        for (let r = 0; r < 4; r++) {
            const row = getRow(r).reverse();
            const slid = slideRow(row).reverse();
            calcScore(getRow(r), slid);
            slid.forEach((v, c) => { grid[r * 4 + c] = v; });
        }
    } else if (direction === 'up') {
        for (let c = 0; c < 4; c++) {
            const col = getCol(c);
            const slid = slideRow(col);
            calcScore(col, slid);
            slid.forEach((v, r) => { grid[r * 4 + c] = v; });
        }
    } else if (direction === 'down') {
        for (let c = 0; c < 4; c++) {
            const col = getCol(c).reverse();
            const slid = slideRow(col).reverse();
            calcScore(getCol(c), slid);
            slid.forEach((v, r) => { grid[r * 4 + c] = v; });
        }
    }

    return { newBoard: grid as Board, score };
}

export function addRandomTile(board: Board): Board {
    const empty = board.map((v, i) => v === 0 ? i : -1).filter(i => i >= 0);
    if (!empty.length) return board;
    const newBoard = [...board] as Board;
    const idx = empty[Math.floor(Math.random() * empty.length)];
    newBoard[idx] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
}

export function canMove(board: Board): boolean {
    if (board.includes(0)) return true;

    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[r * 4 + c] === board[r * 4 + c + 1]) return true;
        }
    }

    for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 3; r++) {
            if (board[r * 4 + c] === board[(r + 1) * 4 + c]) return true;
        }
    }

    return false;
}

export function hasWon(board: Board): boolean {
    return board.includes(2048);
}