import type { Player, GameState, Position, Piece } from "./types";
import { isValidMove, findPieceById, isWinningMove } from "./rules";

export function applyMove(gameState: GameState, pieceId: string, destination: Position): GameState {
    if (gameState.status === "WON") {
        throw new Error("Game is already won");
    }
    const piece: Piece | undefined = findPieceById(gameState, pieceId);
    if (piece === undefined) {
        throw new Error("No valid piece selected");
    }

    if (!isValidMove(gameState, pieceId, destination)) {
        throw new Error("Invalid move");
    }

    const nextPlayer: Player = gameState.currentPlayer === "PLAYER_ONE" ? "PLAYER_TWO" : "PLAYER_ONE";

    const didWin = isWinningMove(piece, destination);

    const newGameState: GameState = { 
        ...gameState,
        currentPlayer: nextPlayer,
        pieces: gameState.pieces.map(piece =>
            piece.id === pieceId ? { ...piece, position: destination } : piece 
        ),
        status: didWin ? "WON" : "IN_PROGRESS",
        winner: didWin ? gameState.currentPlayer : null,
    };



    return newGameState;
}