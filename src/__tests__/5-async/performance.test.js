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
test("callbacks", (done) => {

    //
    // ES does not have a built-in set equality operator.
    //
    let eqSets = (set1, set2) => {
        if (!set1 instanceof Set) {
            throw new TypeError("set1 is not a Set");
        }
        if (!set2 instanceof Set) {
            throw new TypeError("set2 is not a Set");
        }
        if (set1.size != set2.size) {
            return false;
        }
        for (let a of set1) {
            if (!set2.has(a)) {
                return false;
            }
        }
        return true;
    }

    let completions = new Set();
    let expected = new Set(["immediate", "timeout"]);

    let complete = (completed) => {
        completions.add(completed);
        if (eqSets(expected, completions)) {
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