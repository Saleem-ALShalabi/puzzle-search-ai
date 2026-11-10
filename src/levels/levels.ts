import { Level } from '../game/level';

export const stripes = new Level('Stripes (test)', [
  [1, 0, 0, 0, 1],
  [2, 0, 0, 0, 2],
  [3, 0, 0, 0, 3],
  [4, 0, 0, 0, 4],
  [5, 0, 0, 0, 5],
]);

export const level1 = new Level('Level 1', [
  [1, 0, 0, 0, 2],
  [0, 3, 0, 0, 4],
  [0, 5, 0, 2, 0],
  [0, 0, 1, 4, 0],
  [3, 0, 5, 0, 0],
]);

export const allLevels: Level[] = [stripes, level1];