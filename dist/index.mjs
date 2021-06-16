import path from 'path';
import { createLogger } from './Logger.mjs';
export { createLogger } from './Logger.mjs';
export { Transport } from './transports/Transport.mjs';
export { ConsoleTransport } from './transports/ConsoleTransport.mjs';
export { defaultConfig } from './defaults.mjs';
export { captureConsole, consoleTable } from './fakeConsole.mjs';

// Attempt to read config from logger.config.js or logger.config.json in cwd
let baseConfig;
try {
    const configPath = path.join(process.cwd(), 'logger.config');
    // eslint-disable-next-line global-require
    const fileContents = require(configPath);
    baseConfig = fileContents || {};
}
catch (_) {
    baseConfig = {};
}
// Create the default logger.
const defaultLogger = createLogger(baseConfig);

export { defaultLogger };
//# sourceMappingURL=index.mjs.map
