import { theme } from "../theme";
import { Tile } from "./Tile";

export type TileData = {
    id: number;
    value: number;
    row: number;
    col: number;
};

interface BoardProps {
    tiles: TileData[];
}

export function Board({ tiles }: BoardProps) {
    return (
        <div style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1",
            backgroundColor: theme.tile.background,
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0.5rem",
            padding: "0.5rem",
        }}>

            {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} style={{
                    backgroundColor: theme.tile.low,
                    borderRadius: "6px",
                    opacity: 0.5,
                }} />
            ))}


            {tiles.map((tile) => (
                <Tile key={tile.id} {...tile} />
            ))}
        </div>
    );
}
