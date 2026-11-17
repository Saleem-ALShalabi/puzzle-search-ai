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

export function rootNode(state: State): SearchNode {
    return { state, parent: null, move: null, g: 0 };
}

export function expand(node: SearchNode): SearchNode[] {
    return node.state.getPossibleMoves().map(move => ({
        state: node.state.applyMove(move),
        parent: node,
        move,
        g: node.g + 1,
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