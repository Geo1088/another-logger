import { Logger, createLogger } from './Logger';
export declare const defaultLogger: Logger;
declare const _default: Logger & typeof createLogger;
/** Can be used as a logger. Can also be called to create a new logger. */
export default _default;
export * from './transports';
export * from './Logger';
export * from './defaults';
