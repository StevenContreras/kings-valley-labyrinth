import { describe, it, expect } from "vitest";
import { isSamePosition, isInsideBoard } from "../../src/game/position";

describe("isSamePosition", () => {
    it("returns true for same position", () => {
        const pos1 = {
            row: 3,
            col: 3,
        };
        const pos2 = {
            row: 3,
            col: 3,
        };
        expect(isSamePosition(pos1, pos2)).toBe(true);
    });
    it("returns false for different row position", () => {
        const pos1 = {
            row: 3,
            col: 3,
        };
        const pos2 = {
            row: 4,
            col: 3,
        };
        expect(isSamePosition(pos1, pos2)).toBe(false);
    });
    it("returns false for different column position", () => {
        const pos1 = {
            row: 3,
            col: 3,
        };
        const pos2 = {
            row: 3,
            col: 5,
        };
        expect(isSamePosition(pos1, pos2)).toBe(false);
    });
    it("returns false for different row and column position", () => {
        const pos1 = {
            row: 2,
            col: 2,
        };
        const pos2 = {
            row: 1,
            col: 1,
        };
        expect(isSamePosition(pos1, pos2)).toBe(false);
    });
});

describe("isInsideBoard", () => {
    it("returns true if top-left corner", () => {
        const pos1 = {
            row: 0, 
            col: 0,
        };
        expect(isInsideBoard(pos1)).toBe(true);
    });
    it("returns true if center", () => {
        const pos1 = {
            row: 3,
            col: 3,
        };
        expect(isInsideBoard(pos1)).toBe(true);
    });
    it("returns true if bottom-right corner", () => {
        const pos1 = {
            row: 6,
            col: 6,
        };
        expect(isInsideBoard(pos1)).toBe(true);
    });
    it("returns false for negative row", () => {
        const pos1 = {
            row: -1,
            col: 2,
        };
        expect(isInsideBoard(pos1)).toBe(false);
    });
    it("returns false for negative column", () => {
        const pos1 = {
            row: 4,
            col: -2,
        };
        expect(isInsideBoard(pos1)).toBe(false);
    });
    it("returns false when row is larger than board size", () => {
        const pos1 = {
            row: 7,
            col: 5,
        };
        expect(isInsideBoard(pos1)).toBe(false);
    });
    it("returns false when column is larger than board size", () => {
        const pos1 = {
            row: 6,
            col: 7,
        };
        expect(isInsideBoard(pos1)).toBe(false);
    });
});