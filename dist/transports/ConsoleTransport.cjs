'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ansiColors = require('ansi-colors');
var Transport = require('./Transport.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ansiColors__default = /*#__PURE__*/_interopDefaultLegacy(ansiColors);

class ConsoleTransport extends Transport.Transport {
    constructor({ showTimestamps = false, levelStyles = {}, } = {}) {
        super();
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
    send(message, levelName, logger) {
        const levelText = this.levelTextCache.get(levelName) || levelName;
        console.log(`${this.showTimestamps ? new Date().toISOString().substr(11, 8) + ' ' : ''}${levelText} ${message}`);
    }
}

exports.ConsoleTransport = ConsoleTransport;
//# sourceMappingURL=ConsoleTransport.cjs.map
