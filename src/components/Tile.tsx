import { theme } from "../theme";

interface TileProps {
    value: number;
    row: number;
    col: number;
}

function getTileColor(value: number): { bg: string; color: string } {
    if (value <= 4)   return { bg: theme.tile.low,    color: "#6b6b6b" };
    if (value <= 64)  return { bg: theme.tile.normal,  color: "#ffffff" };
    return              { bg: theme.tile.high,   color: "#6b6b6b" };
}

function getFontSize(value: number): string {
    if (value >= 1000) return "1rem";
    if (value >= 128)  return "1.25rem";
    return "1.5rem";
}

export function Tile({ value, row, col }: TileProps) {
    const { bg, color } = getTileColor(value);

    return (
        <div
            aria-label={`Tile ${value}`}
            style={{
                gridRow: row + 1,
                gridColumn: col + 1,
                backgroundColor: bg,
                color,
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: getFontSize(value),
                animation: "pop 120ms ease-out",
            }}
        >
            {value}
        </div>
    );
}