import {describe, expect, it} from "vitest";
import { findPieceById, isValidMove } from "../../src/game/rules";
import { startingGameState, nonExistentPieceId } from "./fixtures/gameStates";
import type { Direction } from "../../src/game/types";



describe("findPieceById", () => {
    it("returns the piece with the given ID", () => {
        const pieceId = "p1-guard-1";
        const result = findPieceById(startingGameState, pieceId);
        expect(result).toEqual({
            id: "p1-guard-1",
            owner: "PLAYER_ONE",
            role: "GUARD",
            position: { row: 6, col: 0 },
        });
    });
    it("returns undefined if the piece with the given ID does not exist", () => {
        const result = findPieceById(startingGameState, nonExistentPieceId);
        expect(result).toBeUndefined();
    });
});

describe("isValidMove", () => {
    it("returns false if a piece with the given ID does not exist", () => {
        const direction: Direction = "N";
        const result = isValidMove(startingGameState, nonExistentPieceId, direction);
        expect(result).toBe(false);
    });
    it("returns true if a piece with a valid ID exists and belongs to the current player", () => {
        const direction: Direction = "E";
        const pieceId = "p1-guard-2";
        const result = isValidMove(startingGameState, pieceId, direction);
        expect(result).toBe(true);
    });
    it("returns false if a piece with a valid ID exists but does not belong to the current player", () => {
        const direction: Direction = "S";
        const pieceId = "p2-guard-1";
        // Confirms the failure is due to ownership, not a missing piece.
        const piece = findPieceById(startingGameState, pieceId);
        expect(piece).toBeDefined();

        const result = isValidMove(startingGameState, pieceId, direction);
        expect(result).toBe(false);
    });
    it("returns false when a valid current-player piece is blocked in the given direction", () => {
        const direction: Direction = "N";
        const pieceId = "p1-guard-2";
        // Confirms the failure is due to blocked movement, not a missing piece or ownership.
        const piece = findPieceById(startingGameState, pieceId);
        expect(piece).toBeDefined();
        expect(piece?.owner).toBe(startingGameState.currentPlayer);
        const result = isValidMove(startingGameState, pieceId, direction);
        expect(result).toBe(false);
    });
});
