'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _polyfillNode_process = require('./_virtual/_polyfill-node_process.js');
var BrowserConsoleTransport = require('./transports/BrowserConsoleTransport.cjs');
var NodeConsoleTransport = require('./transports/NodeConsoleTransport.cjs');

// If true, we're running under Node.js. If false, we're in a browser.
const isNode = typeof _polyfillNode_process['default'] !== 'undefined' && _polyfillNode_process['default'].version != null && _polyfillNode_process['default'].versions.node != null;
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
        console: isNode ? new NodeConsoleTransport.NodeConsoleTransport({
            levelStyles: {
                debug: 'cyan',
                info: 'blue',
                success: 'green',
                warn: 'yellow',
                error: 'red',
                fatal: 'magenta',
            }
        }) : new BrowserConsoleTransport.BrowserConsoleTransport({
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

exports.defaultConfig = defaultConfig;
//# sourceMappingURL=defaults.cjs.map
