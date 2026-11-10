import { runConsole } from './game/consoleGame';
import { allLevels } from './levels/levels';

runConsole(allLevels).catch(error => {
    console.error(error);
    process.exit(1);
});