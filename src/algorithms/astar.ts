import { State } from '../game/state';
import { SearchNode, SearchResult, expand, rootNode } from './node';
import { PriorityQueue } from './priorityQueue';
import { searchKey } from './ucs';

/**
 * Manhattan distance still to cover:
 * - the current pair: from its head to its end
 * - pairs not started yet: from their start to their end
 * - completed pairs: 0
 * Each move moves one head by one cell and costs at least 1,
 * so this never overestimates the real cost left (admissible and consistent).
 */
export function heuristic(state: State): number {
    let h = 0;
    for (const color of state.level.colors) {
        if (state.isCompleted(color)) continue;
        const head = state.headOf(color);
        const end = state.level.endOf(color);
        h += Math.abs(head.row - end.row) + Math.abs(head.col - end.col);
    }
    return h;
}

interface Entry {
    readonly node: SearchNode;
    readonly f: number;     // g + h, calculated once when the node is pushed
    readonly order: number; // when it was added: breaks ties between equal f
}

export function astar(start: State): SearchResult {
    const frontier = new PriorityQueue<Entry>((a, b) =>
        a.f !== b.f ? a.f - b.f : a.order - b.order,
    );
    const closed = new Set<string>();
    let order = 0;
    let expanded = 0;

    frontier.push({ node: rootNode(start), f: heuristic(start), order: order++ });

    while (frontier.size > 0) {
        const { node } = frontier.pop()!;
        const key = searchKey(node);

        if (closed.has(key)) continue;
        closed.add(key);
        expanded++;

        if (node.state.isGoal()) {
            return { algorithm: 'A*', goal: node, expanded };
        }

        for (const child of expand(node)) {
            if (!closed.has(searchKey(child))) {
                const f = child.g + heuristic(child.state);
                frontier.push({ node: child, f, order: order++ });
            }
        }
    }

    return { algorithm: 'A*', goal: null, expanded };
}