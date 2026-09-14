import type { Direction, Piece, GameState } from './types';
import { getSlidingDestination } from './movement';
import { getBlockedPositions } from './board';
import { isSamePosition } from './position';

export function findPieceById(gameState: GameState, pieceId: string): Piece | undefined {
    return gameState.pieces.find(piece => piece.id === pieceId);
}

export function isValidMove(gameState: GameState, pieceId: string, direction: Direction): boolean {
    const piece = findPieceById(gameState, pieceId);
    if (piece === undefined) {
        return false;
    }
    if (gameState.currentPlayer !== piece.owner) {
        return false;
    }

    const blockedPositions = getBlockedPositions(gameState);
    const destination = getSlidingDestination(
        piece.position, 
        direction, 
        blockedPositions
    );
    if (isSamePosition(piece.position, destination)) {
        return false;
    }

    return true; 
}