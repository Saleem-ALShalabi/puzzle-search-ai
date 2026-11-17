import { State } from '../game/state';
import { SearchNode, SearchResult, expand, rootNode } from './node';

export function dfs(start: State): SearchResult {
    const stack: SearchNode[] = [rootNode(start)];
    const visited = new Set<string>();
    let expanded = 0;

    while (stack.length > 0) {
        const node = stack.pop()!;
        const key = node.state.hash();

        if (visited.has(key)) continue;
        visited.add(key);
        expanded++;

        if (node.state.isGoal()) {
            return { algorithm: 'DFS', goal: node, expanded };
        }

        const children = expand(node);
        for (let i = children.length - 1; i >= 0; i--) {
            const child = children[i];
            if (!visited.has(child.state.hash())) {
                stack.push(child);
            }
        }
    }

    return { algorithm: 'DFS', goal: null, expanded };
}