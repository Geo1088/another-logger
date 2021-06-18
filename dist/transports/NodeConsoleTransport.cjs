'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ansiColors = require('ansi-colors');
var FormattedTransport = require('../models/FormattedTransport.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ansiColors__default = /*#__PURE__*/_interopDefaultLegacy(ansiColors);

/** A transport that logs messages to the Node.js console. */
class NodeConsoleTransport extends FormattedTransport.FormattedTransport {
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
            styles.forEach(style => levelText = ansiColors__default['default'][style](levelText));
            this.levelTextCache.set(levelName, levelText);
        }
    }
    send(message, levelName) {
        const levelText = this.levelTextCache.get(levelName) || levelName;
        console.log(`${this.showTimestamps ? new Date().toISOString().substr(11, 8) + ' ' : ''}${levelText} ${message}`);
    }
}

exports.NodeConsoleTransport = NodeConsoleTransport;
//# sourceMappingURL=NodeConsoleTransport.cjs.map
