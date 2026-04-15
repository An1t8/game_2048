const BEST_SCORE_KEY = 'game2048_best';
const BOARD_KEY = 'game2048_board';
const SCORE_KEY = 'game2048_score';

export function getBestScore(): number {
    try { return parseInt(localStorage.getItem(BEST_SCORE_KEY) || '0'); } catch { return 0; }
}

export function saveBestScore(score: number): void {
    try { localStorage.setItem(BEST_SCORE_KEY, score.toString()); } catch (e) { console.error(e); }
}

export function getBoard(): number[] | null {
    try {
        const data = localStorage.getItem(BOARD_KEY);
        return data ? JSON.parse(data) : null;
    } catch { return null; }
}

export function saveBoard(board: number[]): void {
    try { localStorage.setItem(BOARD_KEY, JSON.stringify(board)); } catch (e) { console.error(e); }
}

export function getScore(): number {
    try { return parseInt(localStorage.getItem(SCORE_KEY) || '0'); } catch { return 0; }
}

export function saveScore(score: number): void {
    try { localStorage.setItem(SCORE_KEY, score.toString()); } catch (e) { console.error(e); }
}
