import { State } from "../game/state";
import { SearchNode, SearchResult, expand, rootNode } from "./node";
import { PriorityQueue } from "./priorityQueue";

interface Entry {
    readonly node: SearchNode;
    readonly order: number;
}

export function searchKey(node: SearchNode): string {
    const key = node.state.hash();
    const last = node.move;
    if (last !== null && last.color === node.state.currentColor()) {
        return `${key}#${last.direction}`;
    }
    return key;
}

export function ucs(start: State): SearchResult {
    const frontier = new PriorityQueue<Entry>((a, b) =>
        a.node.g !== b.node.g ? a.node.g - b.node.g : a.order - b.order,
    );
    const closed = new Set<string>();
    let order = 0;
    let expanded = 0;

    frontier.push({ node: rootNode(start), order: order++ });

    while (frontier.size > 0) {
        const { node } = frontier.pop()!;
        const key = searchKey(node);

        if (closed.has(key)) continue;
        closed.add(key);
        expanded++;

        if (node.state.isGoal()) {
            return { algorithm: 'UCS', goal: node, expanded };
        }

        for (const child of expand(node)) {
            if (!closed.has(searchKey(child))) {
                frontier.push({ node: child, order: order++ });
            }
        }
    }

    return { algorithm: 'UCS', goal: null, expanded };
}