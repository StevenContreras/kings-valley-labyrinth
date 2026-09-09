export type Player = "PLAYER_ONE" | "PLAYER_TWO";

export type PieceRole = "KING" | "GUARD";

export type Direction =
    | "N"
    | "NE"
    | "E"
    | "SE"
    | "S"
    | "SW"
    | "W"
    | "NW";
    
export type Position = {
    row: number;
    col: number;
};

export type Piece = {
    id: string;
    owner: Player;
    role: PieceRole;
    position: Position;
};

export type GameStatus = "IN_PROGRESS" | "WON";

export type GameState = {
    currentPlayer: Player;
    pieces: Piece[];
    walls: Position[];
    status: GameStatus;
    winner: Player | null;
};