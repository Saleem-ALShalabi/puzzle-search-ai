import { Cell, EMPTY, Position } from "./types";

export class Level {
    readonly name: string;
    readonly size: number;
    readonly initialGrid: readonly (readonly Cell[])[];
    readonly endpoints: ReadonlyMap<number, readonly [Position, Position]>;
    readonly colors: readonly number[];

    constructor(name: string, grid: Cell[][]) {
        this.name = name;
        this.size = grid.length;

        for (const row of grid) {
            if (row.length !== this.size) {
                throw new Error(`Level "${name}": grid must be square (${this.size}*${this.size})`);
            }
        }

        const found = new Map<number, Position[]>();
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const cell = grid[row][col];
                if (cell === EMPTY) continue;

                const list = found.get(cell) ?? [];
                list.push({ row, col });
                found.set(cell, list);
            }
        }

        const endpoints = new Map<number, readonly [Position, Position]>();
        for (const [color, positions] of found) {
            if (positions.length !== 2) {
                throw new Error(`Level "${name}": number ${color} appears ${positions.length} times, expected 2.`);
            }
            endpoints.set(color, [positions[0], positions[1]]);
        }

        this.endpoints = endpoints;
        this.colors = [...endpoints.keys()].sort((a, b) => a - b);
        this.initialGrid = grid.map(row => [...row]);

    }

    private getEndpoints(color: number): readonly [Position, Position] {
        const pair = this.endpoints.get(color);
        if (!pair) throw new Error(`Unknown color ${color}`);
        return pair;
    }

    startOf(color: number): Position {
        return this.getEndpoints(color)[0];
    }

    endOf(color: number): Position {
        return this.getEndpoints(color)[1];
    }

    isEndpoint(pos: Position): boolean {
        return this.initialGrid[pos.row][pos.col] !== EMPTY;
    }

    isInside(pos: Position): boolean {
        return (
            pos.row >= 0 &&
            pos.row < this.size &&
            pos.col >= 0 &&
            pos.col < this.size
        );
    }

}

