import type { Position } from "../../../src/game/types";

export const startingGameState: Position[] = [
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
        { row: 1, col: 2 }, 
        { row: 1, col: 5 },
        { row: 5, col: 2 },
        { row: 5, col: 5 },
    ];

    export const randomGameState: Position[] = [
        { row: 0, col: 0 },
        { row: 5, col: 6 },
        { row: 4, col: 6 },
        { row: 0, col: 3 },
        { row: 0, col: 4 },
        { row: 0, col: 5 },
        { row: 0, col: 6 },
        { row: 1, col: 0 },
        { row: 6, col: 1 },
        { row: 6, col: 2 },
        { row: 6, col: 3 },
        { row: 1, col: 4 },
        { row: 6, col: 5 },
        { row: 6, col: 6 },
        { row: 3, col: 1 }, 
        { row: 3, col: 5 },
        { row: 4, col: 1 },
        { row: 4, col: 5 },
    ];

    export const emptyBoardGameState: Position[] = [];