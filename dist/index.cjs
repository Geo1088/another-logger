'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Transport = require('./models/Transport.cjs');
var FormattedTransport = require('./models/FormattedTransport.cjs');
var BrowserConsoleTransport = require('./transports/BrowserConsoleTransport.cjs');
var NodeConsoleTransport = require('./transports/NodeConsoleTransport.cjs');
var Logger = require('./Logger.cjs');
var defaults = require('./defaults.cjs');
var fakeConsole = require('./fakeConsole.cjs');



exports.Transport = Transport.Transport;
exports.FormattedTransport = FormattedTransport.FormattedTransport;
exports.BrowserConsoleTransport = BrowserConsoleTransport.BrowserConsoleTransport;
exports.NodeConsoleTransport = NodeConsoleTransport.NodeConsoleTransport;
exports.createLogger = Logger.createLogger;
exports.defaultLogger = Logger.defaultLogger;
exports.defaultConfig = defaults.defaultConfig;
exports.captureConsole = fakeConsole.captureConsole;
exports.consoleTable = fakeConsole.consoleTable;
//# sourceMappingURL=index.cjs.map
