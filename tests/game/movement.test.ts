import { describe, it, expect } from "vitest";
import { getNextPosition, getSlidingDestination, getDirectionFromPositions } from "../../src/game/movement";
import { startingBlockedPositions, emptyBlockedPositions, randomBlockedPositions } from "./fixtures/gameStates";
import type { Direction, Position } from "../../src/game/types";

// Unit tests for basic directional movement.
// These tests intentionally keep each direction case explicit instead of using
// a loop or shared test table. The repetition makes each row/column change easy
// to inspect while the movement rules are still being built. 
// This may be refactored later if the repetition starts to reduce readability.
// // This file tests one-step directional movement, empty-board sliding,
// and blocker-aware sliding against walls and occupied spaces.
// It does not test turn logic, piece ownership, valley rules, or win conditions yet.

describe("getNextPosition", () => {
    it("returns position N of original position", () => {
        const pos1 = {
            row: 3,
            col: 3,
        };
        const dir1: Direction = "N";
        const result = getNextPosition(pos1, dir1);
        expect(result).toEqual({
            row: 2,
            col: 3,
        });
    });
    it("returns position NE of original position", () => {
        const pos1 = {
            row: 4,
            col: 4,
        };
        const dir1: Direction = "NE";
        const result = getNextPosition(pos1, dir1);
        expect(result).toEqual({
            row: 3,
            col: 5,
        });
    });
    it("returns position E of original position", () => {
        const pos1 = {
            row: 5,
            col: 5,
        };
        const dir1: Direction = "E";
        const result = getNextPosition(pos1, dir1);
        expect(result).toEqual({
            row: 5,
            col: 6,
        });
    });
    it("returns position SE of original position", () => {
        const pos1 = {
            row: 0,
            col: 0,
        };
        const dir1: Direction = "SE";
        const result = getNextPosition(pos1, dir1);
        expect(result).toEqual({
            row: 1,
            col: 1,
        });
    });
    it("returns position S of original position", () => {
        const pos1 = {
            row: 1,
            col: 1,
        };
        const dir1: Direction = "S";
        const result = getNextPosition(pos1, dir1);
        expect(result).toEqual({
            row: 2,
            col: 1,
        });    
    });
    it("returns position SW of original position", () => {
        const pos1 = {
            row: 2,
            col: 2,
        };
        const dir1: Direction = "SW";
        const result = getNextPosition(pos1, dir1);
        expect(result).toEqual({
            row: 3,
            col: 1,
        });
    });
    it("returns position W of original position", () => {
        const pos1 = {
            row: 3,
            col: 3,
        };
        const dir1: Direction = "W";
        const result = getNextPosition(pos1, dir1);
        expect(result).toEqual({
            row: 3,
            col: 2,
        });
    });
    it("returns position NW of original position", () => {
        const pos1 = {
            row: 4,
            col: 4,
        };
        const dir1: Direction = "NW";
        const result = getNextPosition(pos1, dir1);
        expect(result).toEqual({
            row: 3,
            col: 3,
        });
    });

});

describe("getSlidingDestination", () => {
    const pos1: Position = {
        row: 3,
        col: 3, 
    };
    const pos2: Position = {
        row: 6,
        col: 1, 
    };
    const pos3: Position = {
        row: 0,
        col: 1, 
    };
    const pos4: Position = {
        row: 6,
        col: 3,
    };
    const pos5: Position = {
        row: 4,
        col: 2,
    };
    const pos6: Position = {
        row: 0,
        col: 2,
    };
    const pos7: Position = {
        row: 0,
        col: 3,
    };
    const north: Direction = "N";
    const northeast: Direction = "NE";
    const east: Direction  = "E";
    const southeast: Direction  = "SE";
    const south: Direction  = "S";
    const southwest: Direction  = "SW";
    const west: Direction  = "W";
    const northwest: Direction  = "NW";

    it("returns destination at the N end of the board", () => {
        const result = getSlidingDestination(pos1, north, emptyBlockedPositions);
        expect(result).toEqual({
            row: 0,
            col: 3,
        });
    });
    it("returns destination at the NE end of the board", () => {
        const result = getSlidingDestination(pos1, northeast, emptyBlockedPositions);
        expect(result).toEqual({
            row: 0,
            col: 6,
        });
    });
    it("returns destination at the E end of the board", () => {
        const result = getSlidingDestination(pos1, east, emptyBlockedPositions);
        expect(result).toEqual({
            row: 3,
            col: 6,
        });
    });
    it("returns destination at the SE end of the board", () => {
        const result = getSlidingDestination(pos1, southeast, emptyBlockedPositions);
        expect(result).toEqual({
            row: 6,
            col: 6,
        });
    });
    it("returns destination at the S end of the board", () => {
        const result = getSlidingDestination(pos1, south, emptyBlockedPositions);
        expect(result).toEqual({
            row: 6,
            col: 3,
        });
    });
    it("returns destination at the SW end of the board", () => {
        const result = getSlidingDestination(pos1, southwest, emptyBlockedPositions);
        expect(result).toEqual({
            row: 6,
            col: 0,
        });
    });
    it("returns destination at the W end of the board", () => {
        const result = getSlidingDestination(pos1, west, emptyBlockedPositions);
        expect(result).toEqual({
            row: 3,
            col: 0,
        });
    });
    it("returns destination at the NW end of the board in an empty board game state", () => {
        const result = getSlidingDestination(pos1, northwest, emptyBlockedPositions);
        expect(result).toEqual({
            row: 0,
            col: 0,
        });
    });
    it("returns destination SE end of board movement in starting game state", () => {
        const result = getSlidingDestination(pos6, southeast, startingBlockedPositions);
        expect(result).toEqual({
            row: 4,
            col: 6,
        });
    });
    it("returns destination with a wall blocking its path for vertical N movement in starting game state", () => {
        const result = getSlidingDestination(pos2, north, startingBlockedPositions);
        expect(result).toEqual({
            row: 5,
            col: 1,
        });
    });
    it("returns destination with a wall blocking its path for diagonal NE movement in starting game state", () => {
        const result = getSlidingDestination(pos2, northeast, startingBlockedPositions);
        expect(result).toEqual({
            row: 3,
            col: 4,
        });
    });
    it("returns destination with a wall blocking its path for vertical S movement in starting game state", () => {
        const result = getSlidingDestination(pos3, south, startingBlockedPositions);
        expect(result).toEqual({
            row: 1,
            col: 1,
        });
    });
    it("returns destination with a piece blocking its path for vertical N movement in starting game state", () => {
        const result = getSlidingDestination(pos4, north, startingBlockedPositions);
        expect(result).toEqual({
            row: 1,
            col: 3,
        });
    });
    it("returns destination of end of board for vertical S movement in random game state", () => {
        const result = getSlidingDestination(pos7, south, randomBlockedPositions);
        expect(result).toEqual({
            row: 6,
            col: 3,
        })
    });
    it("returns destination with a piece blocking its path for horizontal W movement in random game state", () => {
        const result = getSlidingDestination(pos7, west, randomBlockedPositions);
        expect(result).toEqual({
            row: 0,
            col: 2,
        })
    });
    it("returns destination with a wall blocking its path for diagonal SW movement in random game state", () => {
        const result = getSlidingDestination(pos7, southwest, randomBlockedPositions);
        expect(result).toEqual({
            row: 1,
            col: 2,
        })
    });
    it("returns destination with a wall blocking its path for horizontal E movement in random game state", () => {
        const result = getSlidingDestination(pos5, east, randomBlockedPositions);
        expect(result).toEqual({
            row: 4,
            col: 4,
        })
    });

});

describe("getDirectionFromPositions", () => {
    it("returns N for a destination directly above the start position", () => {
        const start: Position = { row: 6, col: 3 };
        const destination: Position = { row: 1, col: 3 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBe("N");
    });
    it("returns NE for a destination diagonally above and to the right of the start position", () => {
        const start: Position = { row: 6, col: 3 };
        const destination: Position = { row: 5, col: 4 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBe("NE");
    });
    it("returns E for a destination directly to the right of the start position", () => {
        const start: Position = { row: 6, col: 3 };
        const destination: Position = { row: 6, col: 5 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBe("E");
    });
    it("returns SE for a destination diagonally below and to the right of the start position", () => {
        const start: Position = { row: 0, col: 3 };
        const destination: Position = { row: 1, col: 4 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBe("SE");
    });
    it("returns S for a destination directly below the start position", () => {
        const start: Position = { row: 0, col: 3 };
        const destination: Position = { row: 5, col: 3 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBe("S");
    });
    it("returns SW for a destination diagonally below and to the left of the start position", () => {
        const start: Position = { row: 0, col: 3 };
        const destination: Position = { row: 1, col: 2 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBe("SW");
    });
    it("returns W for a destination directly to the left of the start position", () => {
        const start: Position = { row: 6, col: 3 };
        const destination: Position = { row: 6, col: 0 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBe("W");
    });
    it("returns NW for a destination diagonally above and to the left of the start position", () => {
        const start: Position = { row: 6, col: 3 };
        const destination: Position = { row: 5, col: 2 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBe("NW");
    });
    it("returns null for a destination that is not in a straight line from the start position", () => {
        const start: Position = { row: 6, col: 3 };
        const destination: Position = { row: 5, col: 0 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBeNull();
    });
    it("returns null for a destination that is the same as the start position", () => {
        const start: Position = { row: 6, col: 3 };
        const destination: Position = { row: 6, col: 3 };
        const result = getDirectionFromPositions(start, destination);
        expect(result).toBeNull();
    });
});