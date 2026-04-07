import { useState } from 'react'

import './App.css'

function GameBoard() {
    return (
        <div className="w-full aspect-square bg-tile-bg rounded-card shadow-card
                    grid grid-cols-4 gap-2 p-2">
            {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="rounded-tile bg-tile-low shadow-tile
                                flex items-center justify-center
                                text-lg font-bold text-gray-600
                                transition-all duration-150" />
            ))}
        </div>
    );
}

function ScoreBox({ label, value }: { label: string; value: number }){
    return(
        <div className="flex flex-col items-center justify-center
                min-w-[56px] px-3 py-1 rounded-card bg-game-score shadow-card">
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                {label}
                  </span>
            <span className="text-base md:text-lg font-bold text-gray-700">
                {value}
      </span>
        </div>)
}
export function App() {
    const [score] = useState(0);
    const [best] = useState(0);

    return (
        <div className="min-h-screen bg-game-bg flex flex-col font-sans">
            {

            }
            <header className="w-full px-4 py-3 md:py-4
                         flex items-center justify-between
                         bg-white shadow-sm">
                <h1 className="text-2xl md:text-3xl font-bold text-tile-normal tracking-tight">
                    2048</h1>

                <div className="flex gap-2">
                    <ScoreBox label="SCORE" value={score}/>
                    <ScoreBox label="BEST" value={best}/>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center
                       px-4 py-4 md:px-8 md:py-6 lg:py-10">
                <div className="w-full max-w-sm md:max-w-md flex flex-col gap-4">

                    <div className="flex gap-2">
                        <button
                            className="flex-1 py-2 rounded-card font-semibold text-white text-sm
                         bg-btn-newGame
                         hover:brightness-110 active:scale-95
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-newGame
                         transition-all duration-150 shadow-card"
                        >
                            New game
                        </button>
                        <button
                            className="flex-1 py-2 rounded-card font-semibold text-white text-sm
                         bg-btn-restart
                         hover:brightness-110 active:scale-95
                         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-btn-restart
                         transition-all duration-150 shadow-card"
                        >
                            Restart
                        </button>
                    </div>
                    <GameBoard/>

                    <p className="text-center text-xs text-gray-400">
                        ← → ↑ ↓ &nbsp;|&nbsp; swipe
                    </p>

                </div>
            </main>

            <footer className="w-full px-4 py-3 text-center text-xs text-gray-400">
                Posouvej dlaždice a spoj je — dosáhni čísla&nbsp;2048!
            </footer>


        </div>

    )
}

export default App
