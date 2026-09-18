import { isInsideBoard } from "./position";
import { isBlockedPosition } from "./board";
import type { Position, Direction } from "./types";

export function getNextPosition(position: Position, direction: Direction): Position {
    switch (direction) {
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
    }
}

export function getSlidingDestination(position: Position, direction: Direction, blockedPositions: Position[]): Position {
    let destination: Position = {
        row: position.row,
        col: position.col,
    };
    let nextPosition: Position = getNextPosition(destination, direction);

    while (isInsideBoard(nextPosition) && !isBlockedPosition(nextPosition, blockedPositions)) {
        destination = nextPosition;
        nextPosition = getNextPosition(destination, direction);
    }
    return destination;
}

export function getDirectionFromPositions(start: Position, destination: Position): Direction | null {
    const rowDiff = destination.row - start.row;
    const colDiff = destination.col - start.col;

    if (rowDiff === 0 && colDiff > 0) return "E";
    if (rowDiff === 0 && colDiff < 0) return "W";
    if (rowDiff > 0 && colDiff === 0) return "S";
    if (rowDiff < 0 && colDiff === 0) return "N";
    if (rowDiff > 0 && colDiff > 0 && Math.abs(rowDiff) === Math.abs(colDiff)) return "SE";
    if (rowDiff > 0 && colDiff < 0 && Math.abs(rowDiff) === Math.abs(colDiff)) return "SW";
    if (rowDiff < 0 && colDiff > 0 && Math.abs(rowDiff) === Math.abs(colDiff)) return "NE";
    if (rowDiff < 0 && colDiff < 0 && Math.abs(rowDiff) === Math.abs(colDiff)) return "NW";

    return null;
}