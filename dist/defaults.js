"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
const transports_1 = require("./transports");
/**
 * The default configuration options. Options set in logger.config.js are
 * merged with these; that is, the default levels and the default `console`
 * transport will always be available, unless you override them by name.
 */
exports.defaultConfig = {
    levels: {
        debug: true,
        info: true,
        log: true,
        success: true,
        warn: true,
        error: true,
    },
    transports: {
        console: new transports_1.ConsoleTransport({
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
