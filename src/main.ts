const grid: string[][] = [
  ['#', '#', '#'],
  ['#', 'P', '#'],
  ['#', '#', '#'],
];
console.log(grid.map(row => row.join(' ')).join('\n'));