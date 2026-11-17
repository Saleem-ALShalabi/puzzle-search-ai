import { State } from '../game/state';
import { SearchNode, SearchResult, expand, rootNode } from './node';

export function bfs(start: State): SearchResult {
    const queue: SearchNode[] = [rootNode(start)];
    let head = 0;
    const visited = new Set<string>([start.hash()]);
    let expanded = 0;

    while (head < queue.length) {
        const node = queue[head];
        head++;
        expanded++;

        if (node.state.isGoal()) {
            return { algorithm: 'BFS', goal: node, expanded };
        }

        for (const child of expand(node)) {
            const key = child.state.hash();
            if (!visited.has(key)) {
                visited.add(key);
                queue.push(child);
            }
        }
    }

    return { algorithm: 'BFS', goal: null, expanded };
}