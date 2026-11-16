import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { Level } from './level';
import { State } from './state';
import { moveToString } from './types';

function parseChoice(answer: string, count: number): number | undefined {
    const choice = Number(answer);
    if (!Number.isInteger(choice) || choice < 1 || choice > count) return undefined;
    return choice - 1;
}

export async function playLevel(level: Level, rl: readline.Interface): Promise<void> {
    let state = State.initial(level);
    const history: State[] = [];

    console.log(`\n=== ${level.name} ===`);
    console.log('[n] = endpoint, <n> = head of path n, . = empty\n');

    while (true) {
        state.print();
        console.log(`Moves made: ${history.length}`);
        if (state.isGoal()) {
            console.log(`\nSolved in ${history.length} moves!\n`);
            return;
        }

        const moves = state.getPossibleMoves();
        if (moves.length === 0) {
            console.log('\nDead end: no moves left. Type u to undo or r to restart.');
        } else {
            console.log('\nPossible moves:');
            moves.forEach((move, i) => console.log(`  ${i + 1}) ${moveToString(move)}`));
        }

        const answer = (await rl.question('\nYour choice (u = undo, r = restart, q = quit): ')).trim().toLowerCase();
        console.log();

        if (answer === 'q') return;
        if (answer === 'u') {
            const previous = history.pop();
            if (previous === undefined) {
                console.log('Nothing to undo.\n');
            } else {
                state = previous;
            }
            continue;
        }
        if (answer === 'r') {
            state = State.initial(level);
            history.length = 0;
            continue;
        }

        const index = parseChoice(answer, moves.length);
        if (index === undefined) {
            console.log('Invalid choice.\n');
            continue;
        }

        const next = state.applyMove(moves[index]);
        history.push(state);
        state = next;
    }
}

export async function runConsole(levels: Level[]): Promise<void> {
    const rl = readline.createInterface({ input, output });

    try {
        while (true) {
            console.log('Levels:');
            levels.forEach((level, i) => console.log(`  ${i + 1}) ${level.name}`));

            const answer = (await rl.question('Choose a level (q to quit): ')).trim().toLowerCase();
            if (answer === 'q') break;

            const index = parseChoice(answer, levels.length);
            if (index === undefined) {
                console.log('Invalid choice.\n');
                continue;
            }

            await playLevel(levels[index], rl);
        }
    } finally {
        rl.close();
    }
}