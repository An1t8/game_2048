import { useState } from "react";
import { theme } from "../theme";

type OverlayType = "win" | "lose";

interface GameOverlayProps {
    type: OverlayType;
    score: number;
    onRestart: () => void;
    onContinue?: () => void;
}

function OverlayButton({
                           label,
                           bg,
                           onClick,
                       }: {
    label: string;
    bg: string;
    onClick: () => void;
}) {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => { setHover(false); setActive(false); }}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            style={{
                width: "100%",
                backgroundColor: bg,
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                padding: "0.6rem 1rem",
                fontWeight: 600,
                fontSize: "0.875rem",
                cursor: "pointer",
                filter: hover ? "brightness(1.1)" : "brightness(1)",
                transform: active ? "scale(0.95)" : "scale(1)",
                transition: "filter 150ms ease, transform 150ms ease",
            }}
        >
            {label}
        </button>
    );
}

export function GameOverlay({ type, score, onRestart, onContinue }: GameOverlayProps) {
    const isWin = type === "win";
    const overlayBg = isWin
        ? `${theme.states.winBackground}DD`
        : `${theme.states.loseBackground}DD`;

    return (
        <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: overlayBg,
            borderRadius: "12px",
            animation: "fadeIn 250ms ease-out",
        }}
             role="dialog"
             aria-modal="true"
             aria-label={isWin ? "Win" : "Game over"}
        >
            <div style={{
                background: theme.game.background,
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                padding: "1.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
                minWidth: "180px",
                animation: "slideUp 250ms ease-out",
            }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#333", margin: 0 }}>
                    {isWin ? "Win" : "Game Over"}
                </h2>

                <p style={{ fontSize: "1rem", color: "#555", margin: 0 }}>
                    Skóre: <strong>{score}</strong>
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                    {isWin && onContinue && (
                        <OverlayButton label="Continue" bg={theme.buttons.newGame} onClick={onContinue} />
                    )}
                    <OverlayButton label="Play again" bg={theme.buttons.playAgain} onClick={onRestart} />
                </div>
            </div>
        </div>
    );
}