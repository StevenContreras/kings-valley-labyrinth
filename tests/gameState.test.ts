import { describe, it, expect } from "vitest";
import { applyMove } from "../src/game/gameState";
import { findPieceById } from "../src/game/rules";
import { startingGameState, randomGameState, wonGameState } from "./game/fixtures/gameStates";

describe("applyMove", () => {
    it("moves the piece without mutating the original state", () => {
        const pieceId = "p1-guard-1";
        const destination = { row: 1, col: 0 };
        const updatedGameState = applyMove(startingGameState, pieceId, destination);
        const updatedDestination = findPieceById(updatedGameState, pieceId)?.position;
        expect(updatedDestination).toEqual(destination);
        // Confirm that the original game state remains unmutated
        expect(findPieceById(startingGameState, pieceId)?.position).toEqual({ row: 6, col: 0 });   
    });
    it("throws an error when trying to move a non-existent piece", () => {
        const pieceId = "non-existent-piece";
        const destination = { row: 1, col: 0 };
        expect(() => applyMove(startingGameState, pieceId, destination)).toThrow("No valid piece selected");
    });
    it("throws an error when trying to move a piece to an invalid destination", () => {
        const pieceId = "p1-guard-2";
        const destination = { row: 1, col: 2 }; // Invalid move for this piece
        expect(() => applyMove(startingGameState, pieceId, destination)).toThrow("Invalid move");
    })
    it("throws an error when trying to move a piece to a destination that does not match the sliding destination", () => {
        const pieceId = "p1-king";
        const destination = { row: 3, col: 6 }; // Invalid move for this piece due to wall
        expect(() => applyMove(startingGameState, pieceId, destination)).toThrow("Invalid move");
    });
    it("updates the current player after a valid move", () => {
        const pieceId = "p1-guard-1";
        const destination = { row: 1, col: 5 };
        const updatedGameState = applyMove(startingGameState, pieceId, destination);
        expect(updatedGameState.currentPlayer).toEqual("PLAYER_TWO");
    });
    it("game progress remains IN_PROGRESS after a valid move that does not result in a win", () => {
        const pieceId = "p1-guard-2";
        const destination = { row: 5, col: 1 };
        const updatedGameState = applyMove(startingGameState, pieceId, destination);
        expect(updatedGameState.status).toEqual("IN_PROGRESS");
    });
    it("game winner remains null after a valid move that does not result in a win", () => {
        const pieceId = "p1-guard-2";
        const destination = { row: 5, col: 0 };
        const updatedGameState = applyMove(startingGameState, pieceId, destination);
        expect(updatedGameState.winner).toBeNull();
    });
    it("game progress updates to WON and winner is set after a winning move", () => {
        const pieceId = "p2-king";
        const destination = { row: 3, col: 3 };
        const updatedGameState = applyMove(randomGameState, pieceId, destination);
        expect(updatedGameState.status).toEqual("WON");
        expect(updatedGameState.winner).toEqual("PLAYER_TWO");
    });
    it("throws an error when attempting a move after the game is won", () => {
        const pieceId = "p1-guard-1";
        const destination = { row: 4, col: 2 };
        expect(() => applyMove(wonGameState, pieceId, destination)).toThrow("Game is already won");
    });
    it("does not mutate the original game state when a move is applied", () => {
        const pieceId = "p1-guard-2";
        const destination = { row: 3, col: 4 };
        const before = structuredClone(startingGameState);
        applyMove(startingGameState, pieceId, destination);
        expect(startingGameState).toEqual(before);
    });
});