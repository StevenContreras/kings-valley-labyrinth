import type { Piece, GameState, Position } from './types';
import { getSlidingDestination, getDirectionFromPositions } from './movement';
import { getBlockedPositions } from './board';
import { isSamePosition } from './position';
import { VALLEY_POSITION } from './constants';

export function findPieceById(gameState: GameState, pieceId: string): Piece | undefined {
    return gameState.pieces.find(piece => piece.id === pieceId);
}

export function isValidMove(gameState: GameState, pieceId: string, destination: Position | null): boolean {
    if (destination === null) {
        return false;
    }
    const piece = findPieceById(gameState, pieceId);
    if (piece === undefined) {
        return false;
    }
    if (gameState.currentPlayer !== piece.owner) {
        return false;
    }
    if (isSamePosition(piece.position, destination)) {
        return false;
    }

    if (piece.role === "GUARD" && isSamePosition(destination, VALLEY_POSITION)) {
        return false;
    }

    const direction = getDirectionFromPositions(piece.position, destination);
    if (direction === null) {
        return false;
    }
    const slidingDestination = getSlidingDestination(piece.position, direction, getBlockedPositions(gameState));

    if (!isSamePosition(slidingDestination, destination)) {
        return false;
    }
    return true; 
}

// Destination must already be validated before calling this function i.e applyMove/isValidMove must be called first
export function isWinningMove(piece: Piece, destination: Position): boolean {
    return piece.role === "KING" &&
        isSamePosition(destination, VALLEY_POSITION);
}
    

