//
// ES6 formalizes Promises.
//
// Promises are an improved version of callbacks
//
// * Callbacks do not allow you to elegantly chain operations.
// * Callbacks put you in callback hell.
// * Callbacks do not allow you to run multiple operations at a time, waiting
//   for all operations to complete.
//
// General guidance:
// * When using promises, *always* add a `catch` handler.
// * Consider always rejecting with an `Error`. This will capture the stack
//   trace as part of the response.
//

const arraysEqual = require('array-equal');
const setsEqual = require('sets-equal');

test("simple-promise", () => {

    let chainResults = new Set();
    let listenerOrder = [];

    //
    // The function you give to the promise is executed immediately.
    // It could return immediately or asychronously, either way,
    // any listener will be notified when subscribing
    //
    var promise = new Promise((resolve, reject) => {
        // do something async.
        setTimeout(() => {
            resolve("success");
        }, 50 /* ms */);
    });

    //
    // Note the promise chain (then / catch) is *always invoked*.
    //
    promise.then(success => {
        expect(success).toBe("success");

        //
        // Since this is the first listener attached, it will be the first one invoked.
        //
        listenerOrder.push(1);
        chainResults.add(success);
        return "first";
    }).then(val => {
        //
        // this chained promise will be invoked in both
        // success and failure cases
        //
        expect(val).toBe("first");
        chainResults.add(val);
        return "second";
    }).then(val => {
        expect(val).toBe("second");
        expect(setsEqual(new Set(["success", "first"]), chainResults)).toBeTruthy();
    });

    //
    // A promise can have multiple listeners.
    //
    promise.then(val => {
        listenerOrder.push(2);
        expect(val).toBe("success");
    });

    //
    // Important Note:
    //
    // This test shows how promise callbacks are called in order they are
    // attached to the promise.
    //
    // Do *not* write callbacks which depends on the ordering / existence of
    // other registered callbacks.
    //
    promise.then((val) => {
        listenerOrder.push(3);
        expect(arraysEqual([1, 2, 3], listenerOrder)).toBeTruthy();
    });

    return promise;
});

//
// Promises ensure that even if the promised is fulfilled synchronously, any
// callback you define with `then` will be invoked.
//
test("settled-promise", () => {

    // Create a promise that is already resolved.
    let p = Promise.resolve(100);

    // Even tho the promise is already resolved, any handler attached to
    // the promise will be invoked. This is a great feature, it ensures
    // we do not encounter race conditions when the promise is fulfilled
    // before the handler is attached.
    let called = false;
    p.then(value => {
        called = true;
    }).then(value => {
        expect(called).toBeTruthy();
    });
    return p;
});

//
// Promise.all() is a "gate" to wait on 1->n parallel / concurrent tasks to
// finish before continuing.
//
test("multiple-promises", () => {
    //
    // Promise.all takes an iterable of promises and itself returns
    // a promise that is resolved after all it's promises are resolved.
    //
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 50);
    });
    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => resolve(2), 10);
    });

    return new Promise((resolve, reject) => {
        //
        // Results will be returned in the order they are given to Promise.all
        //
        let p3 = Promise.all([p1, p2]);
        p3.then(value => {
            expect(arraysEqual([1, 2], value)).toBeTruthy();
            resolve("done");
        }).catch(error => {
            reject(error);
        });
    });
});

//
// What happens if some promises given to Promise.all() succeed and others fail?
//
// Both promises execute, however *only* the error handler will fire.
//
test("multiple-promises-resolve-and-reject", () => {

    let executedPromises = new Set();
    let p1 = new Promise((resolve, reject) => {
        executedPromises.add("p1");
        resolve("good");
    });
    let p2 = new Promise((resolve, reject) => {
        executedPromises.add("p2");
        reject("bad");
    });

    // Always attach a `catch` to every promise, including the results from Promise.all()
    return Promise.all([p1, p2])
        .then(val => {
            // will *not* fire, even tho `p1` resolved successfully.
            expect(false).toBeTruthy();
        }).catch(err => {
            expect(err).toBe("bad");
            expect(setsEqual(new Set(["p1", "p2"]), executedPromises)).toBeTruthy();
        });
});

//
// Only the first parameter sent to resolve() or reject() will be delivered to
// the handler.
//
test("promise-single-return-value", () =>  {

    let p = new Promise((resolve, reject) => {
        resolve(1, 2, 3); // Attempt to return multiple values.
    });
    p.then(value => {
        expect(value).toBe(1);
    });
    return p;
});

//
// While we can chain promises, what if one step in the chain needs to
// run code asynchronously?
//
// If you return a Promise from within a `then`, the Promise will be
// resolved before continuing the chain.
//
test("nested-promise", () => {

    let results = new Set();

    return new Promise((resolve, reject) => {
        results.add(1);
        resolve(1);
    }).then(value => {
        //
        // Here, we return a new promise. The runtime will resolve
        // this promise before continuing the outer promise chain.
        //
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                results.add(2);
                resolve(2);
            }, 100);
        })
    }).then(value => {
        expect(setsEqual(new Set([1, 2]), results)).toBeTruthy();
    });
});

//
// Error Handling
//

//
// `then` takes two callbacks.
//
// 1. onFulfilled(val). This will be invoked when the promise normally
//    `resolve`s.
// 2. onRejected(err). This will be invoked when the promise is `reject`ed.
//
// Both functions are optional. If you omit the first (by using `null`), an
// implicit handler will be created which simply returns the value.
//
//
// ------------------------------------------------------------------------
// This:
//
// p.then(null, (err) => console.log(err));
//
// Will expand into:
//
// p.then((val) => { return val; }, (err) => { console.log(err); }
// );
//
// ------------------------------------------------------------------------
// This:
//
// p.then(val => { console.log(val); });
//
// Will expand into:
//
// p.then(
//   (val) => { console.log(val); },
//   (err) => { throw err; }
// );
//
// Always include an exception handler, even if just for logging, at the end of
// your promise chain.
//
test("error-handling", () => {

    const p = new Promise((resolve, reject) => {
        reject(new Error("oops"));
    });
    p.catch(err => {
        expect(err.message).toBe("oops");
    })
});

//
// Errors that occur in a `then` handler, will be handled to the `catch`.
//
test("error-handling-within-then", () => {

    let p = new Promise((resolve, reject) => {
        resolve("done");
    });

    p.then(value => {
        let x = z; // ReferenceError - `z` is not defined.
        expect(true).toBeFalsy(); // execution will *not* get here.
    }).then(value => {
        expect(true).toBeFalsy();
    }).catch(err => {
        expect(err instanceof ReferenceError).toBeTruthy();
    });

    return p;
});
