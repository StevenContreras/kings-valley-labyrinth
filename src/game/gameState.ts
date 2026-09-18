import type { GameState, Position, Piece, Direction } from "./types";
import { getDirectionFromPositions, getSlidingDestination } from "./movement";
import { isValidMove, findPieceById } from "./rules";
import { getBlockedPositions } from "./board";
import { isSamePosition } from "./position";

export function applyMove(gameState: GameState, pieceId: string, destination: Position): GameState {
    const piece: Piece | undefined = findPieceById(gameState, pieceId);
    if (piece === undefined) {
        throw new Error("No valid piece selected");
    }

    const direction: Direction | null = getDirectionFromPositions(piece.position, destination);
    if (direction === null || !isValidMove(gameState, pieceId, direction)) {
        throw new Error("Invalid move");
    }

    const blockedPositions: Position[] = getBlockedPositions(gameState);
    const destinationPosition: Position = getSlidingDestination(piece.position, direction, blockedPositions);
    if (!isSamePosition(destination, destinationPosition)) {
        throw new Error("Invalid move: destination does not match sliding destination");
    }

    const newGameState: GameState = { 
        ...gameState,
        pieces: gameState.pieces.map(piece =>
            piece.id === pieceId ? { ...piece, position: destinationPosition } : piece 
        ),
    };

    return newGameState;
}