export type Cell = number;
export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Position {
    readonly row: number;
    readonly col: number;
}
export interface Move {
    readonly color: number;
    readonly direction: Direction;
}

export const DIRECTION_DELTAS: Record<Direction, Position> = {
    up: { row: -1, col: 0 },
    down: { row: 1, col: 0 },
    left: { row: 0, col: -1 },
    right: { row: 0, col: 1 },
};
export const EMPTY: Cell = 0;
export const DIRECTIONS: Direction[] = ['up', 'down', 'left', 'right'];

export function samePosition(a: Position, b: Position): boolean {
    return a.row === b.row && a.col === b.col;
}