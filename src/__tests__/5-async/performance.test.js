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
// The single threaded nature of JS engines prevents us from having to deal
// with multithreading, which is a huge win.
//

// 
// Callbacks are the most fundamental async pattern in JS.
//
test("callbacks", (done) => {

    done();
    
});