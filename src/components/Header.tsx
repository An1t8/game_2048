import { useState } from "react";
import { theme } from "../theme";

interface HeaderProps {
    onNewGame: () => void;
}

export function Header({ onNewGame }: HeaderProps) {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    return (
        <header style={{
            width: "100%",
            padding: "0.75rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: theme.game.background,
            boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}>
            <h1 style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: theme.tile.normal,
                letterSpacing: "-0.5px",
                margin: 0,
            }}>
                2048
            </h1>

            <button
                onClick={onNewGame}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => { setHover(false); setActive(false); }}
                onMouseDown={() => setActive(true)}
                onMouseUp={() => setActive(false)}
                aria-label="Spustit novou hru"
                style={{
                    backgroundColor: theme.buttons.newGame,
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "0.5rem 1.25rem",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                    filter: hover ? "brightness(1.1)" : "brightness(1)",
                    transform: active ? "scale(0.95)" : "scale(1)",
                    transition: "filter 150ms ease, transform 150ms ease",
                }}
            >
                New Game
            </button>
        </header>
    );
}
