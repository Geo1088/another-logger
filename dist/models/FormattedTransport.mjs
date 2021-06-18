import { formatWithOptions } from 'util';
import { Transport } from './Transport.mjs';

/**
 * A logging transport for Node.js that formats messages via `util.format` and
 * handles messages as strings. See also
 * {@link Transport}.
 */
class FormattedTransport extends Transport {
    constructor(formatOptions = {}) {
        super();
        this.formatOptions = formatOptions;
    }
    sendRaw(contents, levelName, logger) {
        let message = formatWithOptions(this.formatOptions, ...contents);
        this.send(message, levelName, logger);
    }
}

export { FormattedTransport };
//# sourceMappingURL=FormattedTransport.mjs.map
