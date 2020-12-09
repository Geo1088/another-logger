import { Logger } from '../Logger';
export declare abstract class Transport {
    abstract send(message: string, levelName: string, logger: Logger): void;
}
