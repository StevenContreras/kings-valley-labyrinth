import { BOARD_SIZE } from "./constants";
import { isInsideBoard } from "./position";
import type { Position, Direction } from "./types";

export function getNextPosition(position: Position, direction: Direction): Position {
    switch(direction) {
        case "N": 
            return {
                row: position.row - 1,
                col: position.col, 
            };
        case "NE":
            return {
                row: position.row - 1,
                col: position.col + 1,
            };
        case "E": 
            return {
                row: position.row,
                col: position.col + 1,
            };
        case "SE":
            return {
                row: position.row + 1,
                col: position.col + 1,
            };
        case "S": 
            return {
                row: position.row + 1,
                col: position.col,
            };
        case "SW":
            return {
                row: position.row + 1,
                col: position.col - 1,
            };
        case "W":
            return {
                row: position.row,
                col: position.col - 1,
            };
        case "NW":
            return {
                row: position.row - 1,
                col: position.col - 1,
            };
    };
};

export function getSlidingDestination(position: Position, direction: Direction): Position {
    let destination: Position = {
        row: position.row,
        col: position.col,
    };
    let nextPosition: Position = getNextPosition(destination, direction);

    while (isInsideBoard(nextPosition)) {
        destination = nextPosition;
        nextPosition = getNextPosition(destination, direction);
    }
    return destination;
}