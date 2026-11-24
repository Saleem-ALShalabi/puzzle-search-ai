import { State } from '../game/state';
import { SearchNode, SearchResult, expand, rootNode } from './node';
import { heuristic } from './astar';

export function hillClimbing(start: State): SearchResult {
    let current: SearchNode = rootNode(start);
    let currentH = heuristic(current.state);
    let expanded = 0;

    while (true) {
        expanded++;

        if (current.state.isGoal()) {
            return { algorithm: 'Hill climbing', goal: current, expanded };
        }
        const children = expand(current);
        if (children.length === 0) {
            break;
        }
        let best = children[0];
        let bestH = heuristic(best.state);
        for (const child of children) {
            const h = heuristic(child.state);
            if (h < bestH) {
                best = child;
                bestH = h;
            }
        }
        if (bestH >= currentH) {
            break;
        }
        current = best;
        currentH = bestH;
    }
    return { algorithm: 'Hill climbing', goal: null, expanded };
}