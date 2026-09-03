import { describe, expect, it } from "vitest";
import { isBlockedPosition, getBlockedPositions } from "../../src/game/board";
import { startingGameState } from "./fixtures/gameStates";
import type { Position, GameState } from "../../src/game/types";

describe("isBlockedPosition", () => {
    it("returns true for blocked position", () => {
        const pos1: Position = { row: 1, col: 5 };
        expect(isBlockedPosition(pos1, startingGameState)).toBe(true);
    });
    it("returns false for unblocked position", () => {
        const pos1: Position = { row: 3, col: 3 };
        expect(isBlockedPosition(pos1, startingGameState)).toBe(false);
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
       