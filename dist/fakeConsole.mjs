import { Writable } from 'stream';
import { Console } from 'console';

// Eventually we'll use a fake console for more stuff, for now this file just
function captureConsole(func) {
    // Create an output stream that adds all the data sent to it to a string,
    // and patch it so the console will think it has the same color capability
    // as process.stdout
    let outputData = '';
    const outputStream = Object.assign(new Writable({
        write(chunk, encoding, next) {
            outputData += chunk;
            next();
        }
    }), {
        isTTY: process.stdout.isTTY,
        getColorDepth(...args) {
            return process.stdout.getColorDepth(...args);
        }
    });
    // Create a console that sends its stdout to the output stream
    const fakeConsole = new Console({ stdout: outputStream });
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

export { captureConsole, consoleTable };
//# sourceMappingURL=fakeConsole.mjs.map
