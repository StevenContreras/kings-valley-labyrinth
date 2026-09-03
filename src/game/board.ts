import { isSamePosition } from "./position";
import type { GameState, Position } from "./types";


export function isBlockedPosition(pos1: Position, blockedList: Position[]): boolean {
    for (let i: number = 0; i < blockedList.length; i++) {
        if (isSamePosition(pos1, blockedList[i])) {
            return true;
        }
    }
    return false;
}

export function getBlockedPositions(gameState: GameState): Position[] {
    const blockedPositions: Position[] = [
        ...gameState.pieces.map(piece => piece.position), 
        ...gameState.walls
        ];
    return blockedPositions;
}
