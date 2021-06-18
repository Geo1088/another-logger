'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var Logger = require('./Logger.cjs');
var Transport = require('./models/Transport.cjs');
var FormattedTransport = require('./models/FormattedTransport.cjs');
var BrowserConsoleTransport = require('./transports/BrowserConsoleTransport.cjs');
var NodeConsoleTransport = require('./transports/NodeConsoleTransport.cjs');
var defaults = require('./defaults.cjs');
var fakeConsole = require('./fakeConsole.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

// Attempt to read config from logger.config.js or logger.config.json in cwd
let baseConfig;
try {
    const configPath = path__default['default'].join(process.cwd(), 'logger.config');
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
