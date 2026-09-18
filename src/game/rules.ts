import type { Direction, Piece, GameState } from './types';
import { getSlidingDestination } from './movement';
import { getBlockedPositions } from './board';
import { isSamePosition } from './position';
import { VALLEY_POSITION } from './constants';

export function findPieceById(gameState: GameState, pieceId: string): Piece | undefined {
    return gameState.pieces.find(piece => piece.id === pieceId);
}

export function isValidMove(gameState: GameState, pieceId: string, direction: Direction | null): boolean {
    if (direction === null) {
        return false;
    }
    const piece = findPieceById(gameState, pieceId);
    if (piece === undefined) {
        return false;
    }
    if (direction === null) {
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

    if (piece.role === "GUARD" && isSamePosition(destination, VALLEY_POSITION)) {
        return false;
    }

    return true; 
}

export function isWinningMove(gameState: GameState, pieceId: string, direction: Direction): boolean {
    if (!isValidMove(gameState, pieceId, direction)) {
        return false;
    }

    const piece = findPieceById(gameState, pieceId);
    const blockedPositions = getBlockedPositions(gameState);
    const destination = getSlidingDestination(
        piece!.position, 
        direction, 
        blockedPositions
    );
    return piece!.role === "KING" &&
        isSamePosition(destination, VALLEY_POSITION);
}
    

