import browser$1 from './_virtual/_polyfill-node_process.js';
import { BrowserConsoleTransport } from './transports/BrowserConsoleTransport.mjs';
import { NodeConsoleTransport } from './transports/NodeConsoleTransport.mjs';

// If true, we're running under Node.js. If false, we're in a browser.
const isNode = typeof browser$1 !== 'undefined' && browser$1.version != null && browser$1.versions.node != null;
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
        fatal: true,
    },
    transports: {
        console: isNode ? new NodeConsoleTransport({
            levelStyles: {
                debug: 'cyan',
                info: 'blue',
                success: 'green',
                warn: 'yellow',
                error: 'red',
                fatal: 'magenta',
            }
        }) : new BrowserConsoleTransport({
            levelColors: {
                debug: 0x11A8CD,
                info: 0x2472C8,
                success: 0x0DBC79,
                warn: 0xE5E510,
                error: 0xCD3131,
                fatal: 0xBC3FBC,
            },
        }),
    }
};

export { defaultConfig };
//# sourceMappingURL=defaults.mjs.map
