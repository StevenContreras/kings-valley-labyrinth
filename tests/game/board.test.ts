import { describe, expect, it } from "vitest";
import { isBlockedPosition, getBlockedPositions } from "../../src/game/board";
import type { Position, GameState } from "../../src/game/types";

describe("isBlockedPosition", () => {
    const blockedList: Position[] = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 0, col: 4 },
        { row: 0, col: 5 },
        { row: 0, col: 6 },
        { row: 6, col: 0 },
        { row: 6, col: 1 },
        { row: 6, col: 2 },
        { row: 6, col: 3 },
        { row: 6, col: 4 },
        { row: 6, col: 5 },
        { row: 6, col: 6 },
        { row: 3, col: 1 }, 
        { row: 5, col: 1 },
        { row: 3, col: 5 },
        { row: 5, col: 5 },
    ];
    it("returns true for blocked position", () => {
        const pos1: Position = { row: 0, col: 0 };
        expect(isBlockedPosition(pos1, blockedList)).toBe(true);
    });
    it("returns false for unblocked position", () => {
        const pos1: Position = { row: 3, col: 3 };
        expect(isBlockedPosition(pos1, blockedList)).toBe(false);
    });
});

describe("getBlockedPositions", () => {
    const gameState: GameState = {
        currentPlayer: "PLAYER_ONE",
        pieces: [
            { id: "1", owner: "PLAYER_ONE", role: "KING", position: { row: 0, col: 3 } },
            { id: "2", owner: "PLAYER_TWO", role: "GUARD", position: { row: 6, col: 0 } },
        ],
        walls: [
            { row: 3, col: 1 },
            { row: 5, col: 5 }, 
        ],
        status: "IN_PROGRESS",
        winner: null,
    };

    it("returns the correct blocked positions array", () => {
        expect(getBlockedPositions(gameState)).toEqual([
            { row: 0, col: 3 },
            { row: 6, col: 0 },
            { row: 3, col: 1 },
            { row: 5, col: 5 },
        ]);
    });
});
       