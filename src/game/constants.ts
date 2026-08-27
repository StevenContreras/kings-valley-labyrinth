import type { Position } from "./types";

export const BOARD_SIZE = 7;

export const VALLEY_POSITION: Position = {
    row: 3,
    col: 3,
};

export const PLAYERS = {
    ONE: "PLAYER_ONE",
    TWO: "PLAYER_TWO",
} as const;

export const PIECE_ROLES = {
    KING: "KING",
    GUARD: "GUARD",
} as const;