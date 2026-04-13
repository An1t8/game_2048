import { theme } from "../theme";

interface ScoreBoardProps {
    score: number;
    best: number;
}

export function ScoreBoard({ score, best }: ScoreBoardProps) {
    return (
        <div style={{ display: "flex", gap: "0.5rem" }}>
            <ScoreBox label="SCORE" value={score} />
            <ScoreBox label="BEST"  value={best}  />
        </div>
    );
}

function ScoreBox({ label, value }: { label: string; value: number }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "64px",
            padding: "0.35rem 0.75rem",
            backgroundColor: theme.game.score,
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        }}>
      <span style={{
          fontSize: "0.6rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "#6b6b6b",
      }}>
        {label}
      </span>
            <span style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#333",
            }}>
        {value}
      </span>
        </div>
    );
}