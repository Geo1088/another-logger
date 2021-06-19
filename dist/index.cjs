'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _polyfillNode_process = require('./_virtual/_polyfill-node_process.js');
var _polyfillNode_path = require('./_virtual/_polyfill-node_path.js');
var Logger = require('./Logger.cjs');
var Transport = require('./models/Transport.cjs');
var FormattedTransport = require('./models/FormattedTransport.cjs');
var BrowserConsoleTransport = require('./transports/BrowserConsoleTransport.cjs');
var NodeConsoleTransport = require('./transports/NodeConsoleTransport.cjs');
var defaults = require('./defaults.cjs');
var fakeConsole = require('./fakeConsole.cjs');

// Attempt to read config from logger.config.js or logger.config.json in cwd
let baseConfig;
try {
    const configPath = _polyfillNode_path['default'].join(_polyfillNode_process['default'].cwd(), 'logger.config');
    // eslint-disable-next-line global-require
    const fileContents = require(configPath);
    baseConfig = fileContents || {};
}
catch (_) {
    baseConfig = {};
}
// Create the default logger.
const defaultLogger = Logger.createLogger(baseConfig);

exports.createLogger = Logger.createLogger;
exports.Transport = Transport.Transport;
exports.FormattedTransport = FormattedTransport.FormattedTransport;
exports.BrowserConsoleTransport = BrowserConsoleTransport.BrowserConsoleTransport;
exports.NodeConsoleTransport = NodeConsoleTransport.NodeConsoleTransport;
exports.defaultConfig = defaults.defaultConfig;
exports.captureConsole = fakeConsole.captureConsole;
exports.consoleTable = fakeConsole.consoleTable;
exports.defaultLogger = defaultLogger;
//# sourceMappingURL=index.cjs.map
