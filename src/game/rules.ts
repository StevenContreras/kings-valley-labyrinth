import type { Direction, Piece, GameState } from './types';

export function findPieceById(gameState: GameState, pieceId: string): Piece | undefined {
    return gameState.pieces.find(piece => piece.id === pieceId);
}

export function isValidMove(gameState: GameState, pieceId: string, _direction: Direction): boolean {
    const piece = findPieceById(gameState, pieceId);
    if (piece === undefined) {
        return false;
    }

    return true; 
}