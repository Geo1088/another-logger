'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var util = require('util');
var Transport = require('./Transport.cjs');

/**
 * A logging transport for Node.js that formats messages via `util.format` and
 * handles messages as strings. See also
 * {@link Transport}.
 */
class FormattedTransport extends Transport.Transport {
    constructor(formatOptions = {}) {
        super();
        this.formatOptions = formatOptions;
    }
    sendRaw(contents, levelName, logger) {
        let message = util.formatWithOptions(this.formatOptions, ...contents);
        this.send(message, levelName, logger);
    }
}

exports.FormattedTransport = FormattedTransport;
//# sourceMappingURL=FormattedTransport.cjs.map
