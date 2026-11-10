import { Level } from "./level";
import { Cell, EMPTY, Position, samePosition } from "./types";

export class State {
    readonly level: Level;
    readonly grid: Cell[][];
    readonly heads: Map<number, Position>;

    constructor(level: Level, grid: Cell[][], heads: Map<number, Position>) {
        this.level = level;
        this.grid = grid;
        this.heads = heads;
    }

    static initial(level: Level): State {
        const grid = level.initialGrid.map(row => [...row]);
        const heads = new Map<number, Position>();
        for (const color of level.colors) {
            heads.set(color, level.startOf(color));
        }
        return new State(level, grid, heads);
    }

    headOf(color: number): Position {
        const head = this.heads.get(color);
        if (!head) throw new Error(`Unknown color ${color}`);
        return head;
    }

    isCompleted(color: number): boolean {
        return samePosition(this.headOf(color), this.level.endOf(color));
    }

    isGoal(): boolean {
        for (const color of this.level.colors) {
            if (!this.isCompleted(color)) return false;
        }

        for (const row of this.grid) {
            for (const cell of row) {
                if (cell === EMPTY) return false;
            }
        }

        return true;
    }

    deepCopy(): State {
        const grid = this.grid.map(row => [...row]);
        const heads = new Map(this.heads);
        return new State(this.level, grid, heads);
    }

    private cellText(row: number, col: number): string {
        const pos: Position = { row, col };
        const cell = this.grid[row][col];
        if (cell === EMPTY) return ' . ';
        if (this.level.isEndpoint(pos)) return `[${cell}]`;
        if (samePosition(this.headOf(cell), pos)) return `<${cell}>`;
        return `${cell}`;
    }

    toString(): string {
        const lines: string[] = [];

        let header = '    ';
        for (let col = 0; col < this.level.size; col++) {
            header += ` ${col} `;
        }
        lines.push(header);

        for (let row = 0; row < this.level.size; row++) {
            let line = ` ${row}  `;
            for (let col = 0; col < this.level.size; col++) {
                line += this.cellText(row, col);
            }
            lines.push(line);
        }

        return lines.join('\n');
    }

    print(): void {
        console.log(this.toString());
    }

}
