import { BOARD_SIZE, VALLEY_POSITION} from "../game/constants";
import type { GameState } from "../game/types";
import { isSamePosition } from "../game/position";
import "./Board.css";

type BoardProps = {
    gameState: GameState;
};

export default function Board({ gameState }: BoardProps) {
    return (
        <div
            className ="board"
            style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`}}
        >
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE}, (_, index) => {
                const position = {
                    row: Math.floor(index / BOARD_SIZE),
                    col: index % BOARD_SIZE,
                };

                const piece = gameState.pieces.find((candidate) => 
                    isSamePosition(candidate.position, position));
                let pieceDisplay: string | null = null;
                if (piece) {
                    pieceDisplay = piece.role === "GUARD" ? "G" : "K";
                }

                const isWall = gameState.walls.some((wall) =>
                    isSamePosition(wall, position)
                );

                const isValley = isSamePosition(position, VALLEY_POSITION);


                return (
                    <div
                        key={index}
                        className ={`cell ${isWall ? "wall" : ""} ${isValley ? "valley" : ""}`}
                    >{pieceDisplay}</div>
                )
            })}

        </div>
    );
}