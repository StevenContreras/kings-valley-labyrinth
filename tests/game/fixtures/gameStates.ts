import type { Position } from "../../../src/game/types";

export const startingGameState: Position[] = [
        { row: 0, col: 0 },// player 1 guard 1
        { row: 0, col: 1 },// player 1 guard 2
        { row: 0, col: 2 },// player 1 guard 3
        { row: 0, col: 3 },// player 1 king
        { row: 0, col: 4 },// player 1 guard 4
        { row: 0, col: 5 },// player 1 guard 5
        { row: 0, col: 6 },// player 1 guard 6
        { row: 6, col: 0 },// player 2 guard 1
        { row: 6, col: 1 },// player 2 guard 2
        { row: 6, col: 2 },// player 2 guard 3
        { row: 6, col: 3 },// player 2 king
        { row: 6, col: 4 },// player 2 guard 4
        { row: 6, col: 5 },// player 2 guard 5
        { row: 6, col: 6 },// player 2 guard 6
        { row: 2, col: 1 },// wall
        { row: 2, col: 5 },// wall
        { row: 4, col: 1 },// wall
        { row: 4, col: 5 },// wall
    ];

    export const randomGameState: Position[] = [
        { row: 5, col: 5 },// player 1 guard 1
        { row: 5, col: 6 },// player 1 guard 2
        { row: 4, col: 6 },// player 1 guard 3
        { row: 0, col: 3 },// player 1 king
        { row: 0, col: 4 },// player 1 guard 4
        { row: 0, col: 5 },// player 1 guard 5
        { row: 0, col: 6 },// player 1 guard 6
        { row: 1, col: 4 },// player 2 guard 1
        { row: 6, col: 1 },// player 2 guard 2
        { row: 6, col: 2 },// player 2 guard 3
        { row: 6, col: 3 },// player 2 king
        { row: 6, col: 4 },// player 2 guard 4
        { row: 6, col: 5 },// player 2 guard 5
        { row: 6, col: 6 },// player 2 guard 6
        { row: 2, col: 1 },// wall
        { row: 2, col: 5 },// wall
        { row: 4, col: 1 },// wall
        { row: 4, col: 5 },// wall
    ];

    export const emptyBoardGameState: Position[] = [];