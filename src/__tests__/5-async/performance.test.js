//
// This file contains notes and theory behind JavaScript's runtime and
// performance characteristics.
//
// Node.js does *not* support multithreading. Node is single threaded.
//
// In reality, only the main event loop runs on the main thread. Most of the I/O
// runs on separate threads, because the I/O APIs in Node.js are asynchronous /
// non-blocking by design, in order to accommodate the event loop.
//
// Promises changed the nature of where the event loop is managed. In pre-ES6
// days, the event loop was managed by the hosting environment. Because ES6
// introduces promises, event loop management moved into the JS engine.
//
// The single threaded nature of JS engines prevents us from having to deal with
// multithreading, which is a huge win.
//
//
// Callbacks
//
// Callbacks were the original "async" pattern in JS. Pass functions to be
// invoked at some later point in time.

//
// Callbacks are the most fundamental async pattern in JS.
//

const setEquals = require('sets-equal');
//
// There are multiple problems with callbacks.
//
// 1. The callback may be executed before you can establish a listener.
// 2. Tracking completion of multiple callbacks is manual.
// 3. Chaining callbacks results in confusing "callback hell".
//
// All of these problems are addressed with Promises.
//
test("callbacks", (done) => {

    let completions = new Set();
    let expected = new Set(["immediate", "timeout"]);

    let complete = (completed) => {
        completions.add(completed);
        if (setEquals(expected, completions)) {
            done();
        }
    }

    setImmediate((a, b) => {
        expect(a).toBe(10);
        expect(b).toBe(100);
        complete("immediate");
    }, 10, 100);

    setTimeout((a, b) => {
        expect(a).toBe(10);
        expect(b).toBe(20);
        complete("timeout");
    }, 0, 10, 20);
});