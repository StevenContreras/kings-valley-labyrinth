import { describe, it, expect } from "vitest";
import { getNextPosition } from "../../src/game/movement";
import { Direction } from "../../src/game/types";

// Unit tests for basic directional movement.
// These tests intentionally keep each direction case explicit instead of using
// a loop or shared test table. The repetition makes each row/column change easy
// to inspect while the movement rules are still being built. 
// But may be refactored in the future.
// This file only tests one-step directional movement, not walls, edges, sliding,
// turn logic, or win conditions.

describe("getNextPosition", () => {
    it("returns postition N of original position", () => {
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