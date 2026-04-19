import './App.css'
import { useCallback } from 'react'
import { useGame } from './hooks/useGame'
import { useKeyboard } from './hooks/useKeyboard'
import { useSwipe } from './hooks/useSwipe'
import { Header } from './components/Header'
import { ScoreBoard } from './components/ScoreBoard'
import { Board } from './components/Board'
import { GameOverlay } from './components/GameOverlay'
import type { Direction } from './types'
import type { TileData } from './components/Board'

export function App() {
    const { board, score, best, status, move, restart, continueGame } = useGame()
    const handleMove = useCallback((dir: Direction) => move(dir), [move])
    useKeyboard(handleMove)
    useSwipe(handleMove)

    const tiles: TileData[] = board
        .map((value, index) => ({
            id: index,
            value,
            row: Math.floor(index / 4),
            col: index % 4,
        }))
        .filter(tile => tile.value !== 0)

    return (
        <div style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
            <Header onNewGame={restart} />

            <div style={{ display: 'flex', justifyContent: 'center', padding: '0.75rem 1rem 0' }}>
                <ScoreBoard score={score} best={best} />
            </div>

            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1rem',
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '360px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    position: 'relative',
                }}>
                    <Board tiles={tiles} />

                    {status !== 'playing' && (
                        <GameOverlay
                            type={status === 'won' ? 'win' : 'lose'}
                            score={score}
                            onRestart={restart}
                            onContinue={continueGame}
                        />
                    )}

                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#aaa' }}>
                        ← → ↑ ↓ &nbsp;|&nbsp; swipe
                    </p>
                </div>
            </main>

            <footer style={{
                padding: '0.75rem 1rem',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: '#bbb',
            }}>
                Posouvej dlaždice a spoj je — dosáhni čísla&nbsp;2048!
            </footer>
        </div>
    )
}

export default App