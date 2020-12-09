"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultLogger = void 0;
const path_1 = __importDefault(require("path"));
const Logger_1 = require("./Logger");
// Attempt to read config from logger.config.js or logger.config.json in cwd
let baseConfig;
try {
    const configPath = path_1.default.join(process.cwd(), 'logger.config');
    // eslint-disable-next-line global-require
    const fileContents = require(configPath);
    baseConfig = fileContents || {};
}
catch (_) {
    baseConfig = {};
}
// Create the default logger.
exports.defaultLogger = Logger_1.createLogger(baseConfig);
/** Can be used as a logger. Can also be called to create a new logger. */
exports.default = Object.assign(Logger_1.createLogger, exports.defaultLogger);
// Other public exports
__exportStar(require("./transports"), exports);
__exportStar(require("./Logger"), exports);
__exportStar(require("./defaults"), exports);
