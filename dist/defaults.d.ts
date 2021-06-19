import { BrowserConsoleTransport } from './transports/BrowserConsoleTransport';
import { NodeConsoleTransport } from './transports/NodeConsoleTransport';
/** Configuration options for the default logger. */
export declare const defaultConfig: {
    levels: {
        debug: boolean;
        info: boolean;
        success: boolean;
        warn: boolean;
        error: boolean;
        fatal: boolean;
    };
    transports: {
        console: BrowserConsoleTransport | NodeConsoleTransport;
    };
};
