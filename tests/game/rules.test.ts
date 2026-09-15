import {describe, expect, it} from "vitest";
import { findPieceById, isValidMove, isWinningMove } from "../../src/game/rules";
import { startingGameState, nonExistentPieceId, randomGameState } from "./fixtures/gameStates";
import type { Direction } from "../../src/game/types";
import { getBlockedPositions } from "../../src/game/board";
import { getSlidingDestination } from "../../src/game/movement";
import { VALLEY_POSITION } from "../../src/game/constants";



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
        const direction: Direction = "W";
        const pieceId = "p1-guard-2";
        // Confirms the failure is due to blocked movement, not a missing piece or ownership.
        const piece = findPieceById(startingGameState, pieceId);
        expect(piece).toBeDefined();
        expect(piece?.owner).toBe(startingGameState.currentPlayer);
        const result = isValidMove(startingGameState, pieceId, direction);
        expect(result).toBe(false);
    });
    it("returns false when a valid current-player piece is a guard and the destination is the valley", () => {
        const direction: Direction = "SW";
        const pieceId = "p2-guard-6";
        // Confirms the failure is due to an invalid valley movement restriction, not a missing piece or ownership. Also confirms destination is the valley.
        const piece = findPieceById(randomGameState, pieceId);
        expect(piece).toBeDefined();
        expect(piece?.owner).toBe(randomGameState.currentPlayer);
        expect(piece?.role).toBe("GUARD");
        const blockedPositions = getBlockedPositions(randomGameState);
        const destination = getSlidingDestination(
            piece!.position, 
            direction, 
            blockedPositions
        );
        expect(destination).toEqual(VALLEY_POSITION);

        const result = isValidMove(randomGameState, pieceId, direction);
        expect(result).toBe(false);
    });
    it("returns true when a valid current-player piece is a king and the destination is the valley", () => {
        const direction: Direction = "NE";
        const pieceId = "p2-king";
        // Confirms the success is due to a valid valley movement for a king, not a missing piece, non ownership, or non valley valid movement.
        const piece = findPieceById(randomGameState, pieceId);
        expect(piece).toBeDefined();
        expect(piece?.owner).toBe(randomGameState.currentPlayer);
        expect(piece?.role).toBe("KING");
        const blockedPositions = getBlockedPositions(randomGameState);
        const destination = getSlidingDestination(
            piece!.position, 
            direction, 
            blockedPositions
        );
        expect(destination).toEqual(VALLEY_POSITION);

        const result = isValidMove(randomGameState, pieceId, direction);
        expect(result).toBe(true);
    });
});

describe("isWinningMove", () => {
    it("returns false if the move is not a winning move", () => {
        const direction: Direction = "N";
        const pieceId = "p1-king";
        // Confirms the move is valid for the current player's king,
        // but the destination is not the valley.
        const piece = findPieceById(startingGameState, pieceId);
        expect(piece).toBeDefined();
        expect(piece?.owner).toBe(startingGameState.currentPlayer);
        expect(piece?.role).toBe("KING");
        const blockedPositions = getBlockedPositions(startingGameState);
        const destination = getSlidingDestination(
            piece!.position, 
            direction, 
            blockedPositions
        );
        expect(destination).not.toEqual(VALLEY_POSITION);

        const result = isWinningMove(startingGameState, pieceId, direction);
        expect(result).toBe(false);
    });
    it("returns true if the move is a winning move", () => {
        const direction: Direction = "NE";
        const pieceId = "p2-king";
        // Confirms the current player's king lands on the valley.
        const piece = findPieceById(randomGameState, pieceId);
        expect(piece).toBeDefined();
        expect(piece?.owner).toBe(randomGameState.currentPlayer);
        expect(piece?.role).toBe("KING");
        const blockedPositions = getBlockedPositions(randomGameState);
        const destination = getSlidingDestination(
            piece!.position, 
            direction, 
            blockedPositions
        );
        expect(destination).toEqual(VALLEY_POSITION);

        const result = isWinningMove(randomGameState, pieceId, direction);
        expect(result).toBe(true);
    });
});
