import { format } from './_virtual/_polyfill-node_util.js';
import { defaultConfig } from './defaults.mjs';
import { consoleTable } from './fakeConsole.mjs';

/** Creates a logger from the given configuration. */
// TODO: is there any way to clean up this signatrure? I'm hesitant to touch it
//       anymore because the intellisense tooltip it generates is really concise
//       but if it can be simplified without making Intellisense unreadable then
//       we should do that.
function createLogger(config) {
    // Create the object we'll fill with logger functions
    const logger = {};
    // Apply the config customizations on top of the default config
    // TODO: this is not a deep clone. does it need to be?
    config.levels = Object.assign({}, defaultConfig.levels, config.levels);
    config.transports = Object.assign({}, defaultConfig.transports, config.transports);
    // Because defaultConfig defines both levels and transports, we can now
    // guarantee config.levels and config.transports are not undefined, so
    // they can be used as config.levels! and config.transports! from now on
    // Create logger functions for all configured levels and add them
    for (const [levelName, levelOptions] of Object.entries(config.levels)) {
        // Make a list of transports to send messages of this level to
        let transports;
        if (levelOptions === true) {
            // all transports
            transports = [...Object.values(config.transports)];
        }
        else if (levelOptions === false) {
            // no transports (level disabled, but log functions still exist)
            transports = [];
        }
        else {
            // set transports based on what's in useTransports/disableTransports
            let transportNames = levelOptions.useTransports || Object.keys(config.transports);
            if (levelOptions.disableTransports) {
                transportNames = transportNames.filter(name => !levelOptions.disableTransports?.includes(name));
            }
            transports = transportNames.map(name => config.transports[name]).filter(t => t);
        }
        // Create the logger functions for this level
        const loggerFunc = (...contents) => {
            // send message to all transports configured for this level
            transports.forEach(transport => transport.sendRaw(contents, levelName, logger));
        };
        loggerFunc.trace = (...contents) => {
            const stacktrace = new Error().stack
                // Remove the first two lines, leaving a newline as the first char
                .replace(/.*\n.*/, '')
                // Remove lines coming from internal modules
                .replace(/\n\s*at \S+ \(internal[\s\S]*$/, '');
            loggerFunc(format(...contents) + stacktrace);
        };
        loggerFunc.table = (...contents) => {
            let tableString = consoleTable(...contents);
            // If the table is multiline, add a newline at the beginning to preserve
            // alignment. `indexOf` check because passing e.g. a number to the table
            // function results in that number being returned, and numbers don't
            // have an `indexOf` method.
            if (typeof tableString === 'string' && tableString.indexOf('\n') !== -1) {
                tableString = `\n${tableString}`;
            }
            loggerFunc(tableString);
        };
        // We know levelName is a level key since it came right out of 
        // Object.entries(config.levels) above, Typescript just doesn't know it
        logger[levelName] = loggerFunc;
    }
    // We've now added all levels to the logger, including those from the
    // default configuration since we merged that with the given comfiguration
    // at the beginning, so it's safe to assert that it has all the same
    // properties as this type implies.
    return logger;
}
/**
 * The default logger. Has levels `debug`, `info`, `success`, `warn`, `error`,
 * and `fatal`, and a transport that sends log messages to the console.
 */
const defaultLogger = createLogger({});

export { createLogger, defaultLogger };
//# sourceMappingURL=Logger.mjs.map
