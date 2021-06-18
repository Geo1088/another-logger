import ansiColors from 'ansi-colors';
import { FormattedTransport } from '../models/FormattedTransport.mjs';

/** A transport that logs messages to the Node.js console. */
class NodeConsoleTransport extends FormattedTransport {
    constructor({ showTimestamps = false, levelStyles = {}, } = {}) {
        super({
            colors: true,
        });
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
    send(message, levelName) {
        const levelText = this.levelTextCache.get(levelName) || levelName;
        console.log(`${this.showTimestamps ? new Date().toISOString().substr(11, 8) + ' ' : ''}${levelText} ${message}`);
    }
}

export { NodeConsoleTransport };
//# sourceMappingURL=NodeConsoleTransport.mjs.map
