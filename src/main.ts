import { Level } from './game/level';
import { State } from './game/state';

const level = new Level('Test', [
  [1, 0, 0, 0, 2],
  [0, 3, 0, 0, 4],
  [0, 5, 0, 2, 0],
  [0, 0, 1, 4, 0],
  [3, 0, 5, 0, 0],
]);

const a = State.initial(level);
console.log('A at start:');
a.print();

const b = a.deepCopy();
b.grid[0][1] = 1;
b.heads.set(1, { row: 0, col: 1 });

console.log('\nB after a fake move:');
b.print();

console.log('\nA again (must be unchanged):');
a.print();