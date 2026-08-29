import { describe, it, expect } from "vitest";
import { getNextPosition, getSlidingDestination } from "../../src/game/movement";
import type { Direction } from "../../src/game/types";

// Unit tests for basic directional movement.
// These tests intentionally keep each direction case explicit instead of using
// a loop or shared test table. The repetition makes each row/column change easy
// to inspect while the movement rules are still being built. 
// This may be refactored later if the repetition starts to reduce readability.
// This file tests one-step directional movement and empty-board sliding.
// It does not test walls, occupied spaced, or win conditions yet. 

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
    const pos1 = {
        row: 3,
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
        const result = getSlidingDestination(pos1, north);
        expect(result).toEqual({
            row: 0,
            col: 3,
        });
    });
    it("returns destination at the NE end of the board", () => {
        const result = getSlidingDestination(pos1, northeast);
        expect(result).toEqual({
            row: 0,
            col: 6,
        });
    });
    it("returns destination at the E end of the board", () => {
        const result = getSlidingDestination(pos1, east);
        expect(result).toEqual({
            row: 3,
            col: 6,
        });
    });
    it("returns destination at the SE end of the board", () => {
        const result = getSlidingDestination(pos1, southeast);
        expect(result).toEqual({
            row: 6,
            col: 6,
        });
    });
    it("returns destination at the S end of the board", () => {
        const result = getSlidingDestination(pos1, south);
        expect(result).toEqual({
            row: 6,
            col: 3,
        });
    });
    it("returns destination at the SW end of the board", () => {
        const result = getSlidingDestination(pos1, southwest);
        expect(result).toEqual({
            row: 6,
            col: 0,
        });
    });
    it("returns destination at the W end of the board", () => {
        const result = getSlidingDestination(pos1, west);
        expect(result).toEqual({
            row: 3,
            col: 0,
        });
    });
    it("returns destination at the NW end of the board", () => {
        const result = getSlidingDestination(pos1, northwest);
        expect(result).toEqual({
            row: 0,
            col: 0,
        });
    });
});