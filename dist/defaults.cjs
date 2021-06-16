'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ConsoleTransport = require('./transports/ConsoleTransport.cjs');

/**
 * The default configuration options. Options set in logger.config.js are
 * merged with these; that is, the default levels and the default `console`
 * transport will always be available, unless you override them by name.
 */
const defaultConfig = {
    levels: {
        debug: true,
        info: true,
        log: true,
        success: true,
        warn: true,
        error: true,
    },
    transports: {
        console: new ConsoleTransport.ConsoleTransport({
            levelStyles: {
                debug: 'cyan',
                info: 'blue',
                success: 'green',
                warn: 'yellow',
                error: 'red',
            }
        }),
    }
};

exports.defaultConfig = defaultConfig;
//# sourceMappingURL=defaults.cjs.map
