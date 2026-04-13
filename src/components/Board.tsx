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

const GAP = 2;
const CELL = (100 - GAP * 5) / 4;

export function Board({ tiles }: BoardProps) {
    return (
        <div style={{
            position: "relative",
            width: "100%",
            aspectRatio: "1",
            backgroundColor: theme.tile.background,
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        }}>

            {Array.from({ length: 16 }).map((_, i) => {
                const row = Math.floor(i / 4);
                const col = i % 4;
                return (
                    <div key={i} style={{
                        position: "absolute",
                        left:   `${GAP + col * (CELL + GAP)}%`,
                        top:    `${GAP + row * (CELL + GAP)}%`,
                        width:  `${CELL}%`,
                        height: `${CELL}%`,
                        backgroundColor: theme.tile.low,
                        borderRadius: "6px",
                        opacity: 0.5,
                    }} />
                );
            })}


            {tiles.map((tile) => (
                <Tile key={tile.id} {...tile} cellSize={CELL} gap={GAP} />
            ))}
        </div>
    );
}
