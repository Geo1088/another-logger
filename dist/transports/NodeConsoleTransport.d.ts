import ansiColors from 'ansi-colors';
import { FormattedTransport } from '../models';
declare type StyleKey = keyof typeof ansiColors["styles"];
/** A transport that logs messages to the Node.js console. */
export declare class NodeConsoleTransport extends FormattedTransport {
    showTimestamps: boolean;
    levelTextCache: Map<string, string>;
    constructor({ showTimestamps, levelStyles, }?: {
        showTimestamps?: boolean;
        levelStyles?: {
            [levelName: string]: StyleKey | StyleKey[];
        };
    });
    send(message: string, levelName: string): void;
}
export {};
