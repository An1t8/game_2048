import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { ScoreBoard } from './components/ScoreBoard'
import { Board } from './components/Board'
import type { TileData } from './components/Board'

const PLACEHOLDER_TILES: TileData[] = [
    { id: 1, value: 2,   row: 0, col: 0 },
    { id: 2, value: 8,   row: 0, col: 2 },
    { id: 3, value: 16,  row: 1, col: 1 },
    { id: 4, value: 128, row: 2, col: 3 },
]

export function App() {
    const [score] = useState(0)
    const [best]  = useState(0)

    function handleNewGame() {


        console.log('Nová hra')
    }

    return (
        <div style={{
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>

            <Header onNewGame={handleNewGame} />

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
                }}>
                    <Board tiles={PLACEHOLDER_TILES} />

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