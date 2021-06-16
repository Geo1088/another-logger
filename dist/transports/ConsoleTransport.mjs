import ansiColors from 'ansi-colors';
import { Transport } from './Transport.mjs';

class ConsoleTransport extends Transport {
    constructor({ showTimestamps = false, levelStyles = {}, } = {}) {
        super();
        this.levelTextCache = new Map();
        this.showTimestamps = showTimestamps;
        for (let [levelName, styles] of Object.entries(levelStyles)) {
            let levelText = levelName;
            if (!Array.isArray(styles))
                styles = [styles];
            styles.forEach(style => levelText = ansiColors[style](levelText));
            this.levelTextCache.set(levelName, levelText);
        }
    }
    send(message, levelName, logger) {
        const levelText = this.levelTextCache.get(levelName) || levelName;
        console.log(`${this.showTimestamps ? new Date().toISOString().substr(11, 8) + ' ' : ''}${levelText} ${message}`);
    }
}

export { ConsoleTransport };
//# sourceMappingURL=ConsoleTransport.mjs.map
