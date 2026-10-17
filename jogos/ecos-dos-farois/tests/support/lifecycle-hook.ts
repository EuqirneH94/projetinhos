// Test-only preload. Normal startup NEVER imports this module.
import { Game } from '../../server/src/game.js';
const step = Game.prototype.step;
let fired = false;
Game.prototype.step = function (...args: Parameters<typeof step>) {
  if (this.players.size && !fired) {
    fired = true;
    switch (process.env.EDF_TEST_FAILURE) {
      case 'tick': throw new Error('EDF_CONTROLLED_TICK_FAILURE');
      case 'rejection': void Promise.reject(new Error('EDF_CONTROLLED_REJECTION')); break;
      case 'exception': setImmediate(() => { throw new Error('EDF_CONTROLLED_EXCEPTION'); }); break;
      case 'exit': process.exit(9);
    }
  }
  return step.apply(this, args);
};
// IPC represents the runtime signal handler on every OS. Windows kill(SIGINT)
// is NOT equivalent to a console Ctrl+C and is tested separately as force kill.
process.on('message', message => { if (message === 'shutdown') process.emit('SIGTERM'); });
