import { describe, expect, it } from "vitest";
import { isBlockedPosition } from "../../src/game/board";
import type { Position } from "../../src/game/types";

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