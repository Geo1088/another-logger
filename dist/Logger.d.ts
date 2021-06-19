import { Transport } from './models/Transport';
import { defaultConfig } from './defaults';
/** Configuration for a logger. */
export interface LoggerConfig {
    /**
     * An object defining the log levels to use. For each entry, the key is the
     * level name, and the value determines which transports are used by the
     * level. A value of `true` sends this level to all transports, `false`
     * sends the level to no transports (disabling its output), and an object
     * value can be used to provide control for individual transports.
     */
    levels?: {
        [name: string]: boolean | {
            /**
             * A list of transport names that this level should be sent to.
             */
            useTransports?: string[];
            /**
             * A list of transport names that this level should *not* be sent
             * to. If `useTransports` is unset, the level will be sent to all
             * transports except those in this list.
             */
            disableTransports?: string[];
        };
    };
    /**
     * An object defining transports usable by the logger. A transport
     * represents a target for log messages, e.g. the console or a chat program.
     * For each entry in this object, the key is the name of the transport, and
     * the value is a transport instance.
     */
    transports?: {
        [name: string]: Transport;
    };
}
/** A function that logs things at a particular level. */
export interface LoggerFunction {
    /** Sends a message to all transports configured for this level. */
    (...contents: any[]): void;
    /** Sends a message and include a stack trace. */
    trace(...contents: any[]): void;
    /**
     * Renders a table with the given input, optionally filtering the rendered
     * properties.
     */
    table(tabularData: any, properties?: string[]): void;
}
/** An object with methods for each configured log level. */
export declare type Logger<LevelName extends keyof any = keyof any> = {
    [key in LevelName]: LoggerFunction;
};
/** Creates a logger from the given configuration. */
export declare function createLogger<T extends LoggerConfig>(config: T): Logger<keyof T["levels"] | keyof typeof defaultConfig["levels"]>;
/**
 * The default logger. Has levels `debug`, `info`, `success`, `warn`, `error`,
 * and `fatal`, and a transport that sends log messages to the console.
 */
export declare const defaultLogger: Logger<"debug" | "info" | "success" | "warn" | "error" | "fatal">;
