import * as ansiColors from 'ansi-colors';
import { Logger } from '../Logger';
import { Transport } from './Transport';
declare type StyleKey = keyof typeof ansiColors["styles"];
export declare class ConsoleTransport extends Transport {
    showTimestamps: boolean;
    levelTextCache: Map<string, string>;
    constructor({ showTimestamps, levelStyles, }?: {
        showTimestamps?: boolean;
        levelStyles?: {
            [levelName: string]: StyleKey | StyleKey[];
        };
    });
    send(message: string, levelName: string, logger: Logger): void;
}
export {};
