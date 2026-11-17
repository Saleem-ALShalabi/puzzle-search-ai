import { State } from './game/state';
import { moveToString } from './game/types';
import { bfs } from './algorithms/bfs';
import { dfs } from './algorithms/dfs';
import { SearchResult, pathOf } from './algorithms/node';
import { allLevels } from './levels/levels';

const algorithms: ((start: State) => SearchResult)[] = [bfs, dfs];

function printResult(result: SearchResult, ms: number): void {
    console.log(`${result.algorithm} | expanded: ${result.expanded} | time: ${ms.toFixed(2)} ms`);

    if (result.goal === null) {
        console.log('No solution.');
        return;
    }

    const moves = pathOf(result.goal)
        .slice(1)
        .map(node => moveToString(node.move!));
    console.log(`Solution (${result.goal.g} moves): ${moves.join(', ')}`);
    result.goal.state.print();
}

for (const level of allLevels) {
    const start = State.initial(level);
    console.log(`\n=== ${level.name} ===`);
    start.print();
    console.log();

    for (const algorithm of algorithms) {
        const begin = performance.now();
        const result = algorithm(start);
        const ms = performance.now() - begin;

        printResult(result, ms);
        console.log();
    }
}