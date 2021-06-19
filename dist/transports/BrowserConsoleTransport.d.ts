import { Transport } from "../models/Transport";
export declare class BrowserConsoleTransport implements Transport {
    levelCssCache: Map<string, string>;
    constructor({ levelColors }?: {
        /**
         * A map of level names to colors used in the console. Colors can be
         * specified as 6-digit hex number literals, e.g. `0x0094FF`.
         */
        levelColors?: Record<string, number>;
    });
    sendRaw(message: any[], level: string): void;
}
