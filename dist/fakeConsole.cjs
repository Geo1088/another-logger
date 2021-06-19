'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _polyfillNode_process = require('./_virtual/_polyfill-node_process.js');
var stream = require('stream');
var console = require('console');

function captureConsole(func) {
    // Create an output stream that adds all the data sent to it to a string,
    // and patch it so the console will think it has the same color capability
    // as process.stdout
    let outputData = '';
    const outputStream = Object.assign(new stream.Writable({
        write(chunk, encoding, next) {
            outputData += chunk;
            next();
        }
    }), {
        isTTY: _polyfillNode_process['default'].stdout.isTTY,
        getColorDepth(...args) {
            return _polyfillNode_process['default'].stdout.getColorDepth(...args);
        }
    });
    // Create a console that sends its stdout to the output stream
    const fakeConsole = new console.Console({ stdout: outputStream });
    // Do something with the fake console
    func(fakeConsole);
    // Return the data we recorded
    return outputData;
}
/**
 * Returns the output of console.table as a string isntead of writing it to
 * stdout.
 * @param   Arguments as passed to `console.table`
 */
function consoleTable(tabularData, properties) {
    return captureConsole(c => c.table(tabularData, properties)).replace(/\n$/, '');
}

exports.captureConsole = captureConsole;
exports.consoleTable = consoleTable;
//# sourceMappingURL=fakeConsole.cjs.map
