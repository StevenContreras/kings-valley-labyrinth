import { BOARD_SIZE } from "./constants";
import type { Position } from "./types";

export function isSamePosition(pos1: Position, pos2: Position): boolean {
    return pos1.row === pos2.row && pos1.col === pos2.col;
}

export function isInsideBoard(pos: Position): boolean {
    return pos.row >= 0 && pos.col >= 0 && pos.row < BOARD_SIZE && pos.col < BOARD_SIZE;
}