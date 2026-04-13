const BEST_SCORE_KEY = 'game2048_best';

export function getBestScore(): number {
    try {
        return parseInt(localStorage.getItem(BEST_SCORE_KEY) || '0');
    } catch {
        return 0;
    }
}

export function saveBestScore(score: number): void {
    try {
        localStorage.setItem(BEST_SCORE_KEY, score.toString());
    } catch {
        console.error('Nelze uložit skóre');
    }
}