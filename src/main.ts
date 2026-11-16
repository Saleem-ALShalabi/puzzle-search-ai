import { State } from './game/state';
import { Direction, moveToString } from './game/types';
import { level1 } from './levels/levels';

const start = State.initial(level1);
start.print();

// 1. Only pair 1 can move at the start
console.log('\nCurrent color:', start.currentColor());
console.log('Moves:', start.getPossibleMoves().map(moveToString).join(', '));

// 2. A move for another pair is illegal now
console.log('\n3 left legal?', start.isLegal({ color: 3, direction: 'left' }));
try {
    start.applyMove({ color: 3, direction: 'left' });
} catch (error) {
    console.log('Caught:', (error as Error).message);
}

// 3. Play the solution, pair by pair
const solution: [number, Direction][] = [
    [1, 'right'], [1, 'right'], [1, 'down'], [1, 'down'], [1, 'down'],
    [2, 'left'], [2, 'down'], [2, 'down'],
    [3, 'left'], [3, 'down'], [3, 'down'], [3, 'down'],
    [4, 'down'], [4, 'down'], [4, 'down'], [4, 'left'], [4, 'up'],
    [5, 'down'], [5, 'down'], [5, 'right'],
];

let state = start;
for (const [color, direction] of solution) {
    state = state.applyMove({ color, direction });
    if (color === 1 && state.isCompleted(1)) {
        console.log('\nAfter pair 1 is completed:');
        state.print();
        console.log('Moves:', state.getPossibleMoves().map(moveToString).join(', '));
    }
}

console.log('\nAfter the full solution:');
state.print();
console.log('Goal?', state.isGoal(), '| current color:', state.currentColor(), '| moves:', state.getPossibleMoves().length);