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

export function createInitialGameState(): GameState {
    return {
        currentPlayer: "PLAYER_ONE",
        pieces: [
            {
                id: "p1-guard-1",
                owner: "PLAYER_ONE",
                role: "GUARD",
                position: { row: 6, col: 0 },
            },
            {
                id: "p1-guard-2",
                owner: "PLAYER_ONE",
                role: "GUARD",
                position: { row: 6, col: 1 },
            },
            {
                id: "p1-guard-3",
                owner: "PLAYER_ONE",
                role: "GUARD",
                position: { row: 6, col: 2 },
            },
            {
                id: "p1-king",
                owner: "PLAYER_ONE",
                role: "KING",
                position: { row: 6, col: 3 },
            },
            {
                id: "p1-guard-4",
                owner: "PLAYER_ONE",
                role: "GUARD",
                position: { row: 6, col: 4 },
            },
            {
                id: "p1-guard-5",
                owner: "PLAYER_ONE",
                role: "GUARD",
                position: { row: 6, col: 5 },
            },
            {
                id: "p1-guard-6",
                owner: "PLAYER_ONE",
                role: "GUARD",
                position: { row: 6, col: 6 },
            },
            {
                id: "p2-guard-1",
                owner: "PLAYER_TWO",
                role: "GUARD",
                position: { row: 0, col: 0 },
            },
            {
                id: "p2-guard-2",
                owner: "PLAYER_TWO",
                role: "GUARD",
                position: { row: 0, col: 1 },
            },
            {
                id: "p2-guard-3",
                owner: "PLAYER_TWO",
                role: "GUARD",
                position: { row: 0, col: 2 },
            },
            {
                id: "p2-king",
                owner: "PLAYER_TWO",
                role: "KING",
                position: { row: 0, col: 3 },
            },
            {
                id: "p2-guard-4",
                owner: "PLAYER_TWO",
                role: "GUARD",
                position: { row: 0, col: 4 },
            },
            {
                id: "p2-guard-5",
                owner: "PLAYER_TWO",
                role: "GUARD",
                position: { row: 0, col: 5 },
            },
            {
                id: "p2-guard-6",
                owner: "PLAYER_TWO",
                role: "GUARD",
                position: { row: 0, col: 6 },
            }

        ],
        walls: [
            { row: 2, col: 1},
            { row: 2, col: 5},
            { row: 4, col: 1},
            { row: 4, col: 5},
        ],
        status: "IN_PROGRESS",
        winner: null,
    };
}