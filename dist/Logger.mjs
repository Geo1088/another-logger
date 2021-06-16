import util from 'util';
import { defaultConfig } from './defaults.mjs';
import { consoleTable } from './fakeConsole.mjs';

/** Creates a logger from the given configuration. */
function createLogger(config) {
    const logger = {};
    config.levels = Object.assign({}, defaultConfig.levels, config.levels);
    config.transports = Object.assign({}, defaultConfig.transports, config.transports);
    // We need to add all the levels to this logger
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
            // HACK: `as [any]` DefinitelyTyped/DefinitelyTyped#50020
            const message = contents.length > 0 ? util.format(...contents) : '';
            // send message to all transports configured for this level
            transports.forEach(transport => transport.send(message, levelName, logger));
        };
        loggerFunc.trace = (...contents) => {
            const stacktrace = new Error().stack
                // Remove the first two lines, leaving a newline as the first char
                .replace(/.*\n.*/, '')
                // Remove lines coming from internal modules
                .replace(/\n\s*at \S+ \(internal[\s\S]*$/, '');
            // HACK: `as [any]` DefinitelyTyped/DefinitelyTyped#50020
            loggerFunc(util.format(...contents) + stacktrace);
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
        // Add this level to the logger
        logger[levelName] = loggerFunc;
    }
    // We've now added all levels to the logger
    return logger;
}

export { createLogger };
//# sourceMappingURL=Logger.mjs.map
