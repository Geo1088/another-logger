// NOTE: In typescript, `import log from 'another-logger'` doesn't work, because
//       that syntax is incompatible with exported functions. You have to use
//       `import log = require('another-logger')` instead.

// The default logger object loads options from logger.config.js/json/ts, so if
// you define your options there, you can use it as a standalone object
import {default as log} from '../../dist/index';
log.debug('Debug message (shown unless you set the PRODUCTION environment variable)');
log.info('Info message (ignored)');
log.warn('Warning message');
log.error('Error message with', 'multiple arguments');
log.success('Success message with', {object: 'inspection'});
log.custom('Custom level, using %d %s', 2, 'percent-strings');
log.custom.trace('Custom level with a traceback and a table below');
log.custom.table([
	{a: 1, b: 2, c: 3},
	{a: 4, b: 5, c: 6},
]);

// You can also call it as a function to create a new instance with additional
// configuration options
import {createLogger, ConsoleTransport} from '../..';
const log2 = createLogger({
	// We can also override the options in logger.config.js
	levels: {
		debug: false,
		info: false,
		warn: true,
		custom2: true,
	},
	transports: {
		console: new ConsoleTransport({
			levelStyles: {

			}
		})
	}
});
log2.debug('Debug message (now shown)');
log2.info('Info message (now shown; warning below will be hidden)');
log2.warn('Warning message (now hidden)');
log2.custom('Levels defined in logger.config.js still work');
log2.custom2('And so does the new level that we defined inline');
