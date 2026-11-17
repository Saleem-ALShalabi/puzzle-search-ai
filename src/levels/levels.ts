import { Level } from '../game/level';

export const level1 = new Level('Level 1', [
  [1, 0, 0, 2, 0],
  [0, 3, 0, 4, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 4, 0, 2],
  [3, 1, 5, 0, 5],
]);

export const allLevels: Level[] = [level1];