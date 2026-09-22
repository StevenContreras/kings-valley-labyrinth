import { describe, it, expect } from "vitest";
import { applyMove } from "../src/game/gameState";
import { findPieceById } from "../src/game/rules";
import { startingGameState } from "./game/fixtures/gameStates";

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
});