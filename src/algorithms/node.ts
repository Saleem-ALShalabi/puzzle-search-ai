import { State } from "../game/state";
import { Move } from "../game/types";

export interface SearchNode {
    readonly state: State;
    readonly parent: SearchNode | null;
    readonly move: Move | null;
    readonly g: number;
}

export interface SearchResult {
    readonly algorithm: string;
    readonly goal: SearchNode | null;
    readonly expanded: Number;
}

export const STEP_COST = 1;
export const TURN_COST = 2;
export function moveCost(lastMove: Move | null, move: Move): number {
    if (lastMove === null || lastMove.color !== move.color) return STEP_COST;
    return lastMove.direction === move.direction ? STEP_COST : TURN_COST;
}

export function rootNode(state: State): SearchNode {
    return { state, parent: null, move: null, g: 0 };
}

export function expand(node: SearchNode): SearchNode[] {
    return node.state.getPossibleMoves().map(move => ({
        state: node.state.applyMove(move),
        parent: node,
        move,
        g: node.g + moveCost(node.move, move),
    }));
}

export function pathOf(node: SearchNode): SearchNode[] {
    const path: SearchNode[] = [];
    let current: SearchNode | null = node;
    while (current !== null) {
        path.push(current);
        current = current.parent;
    }
    return path.reverse();
}