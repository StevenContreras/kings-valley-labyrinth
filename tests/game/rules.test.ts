import {describe, expect, it} from "vitest";
import { findPieceById, isValidMove } from "../../src/game/rules";
import { startingGameState } from "./fixtures/gameStates";

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
});
