//
// ES6 formalizes Promises.
//
// Promises are an improved version of callbacks. They represent a "promise" to
// return a value in the future. The future value could indicate success
// (resolve) or failure (reject).
//
// What are the advantages of promises over callbacks?
//
// * Subscribers are guaranteed to be invoked, regardless if the promise is
//   already settled when the subscriber subscribes.
//
// * Subscribers are invoked exactly once when the promise settles, even if you
//   attempt to settle the promise more than once.
//
// * Callbacks do not allow you to elegantly chain operations, avoiding
//   "callback hell".
//
// * Callbacks do not allow you to run multiple operations at a time, waiting
//   for all operations to complete.
//
// * Promises provide infrastructure for elegantly handling and chaining
//   results.
//
// * Promises are the foundation for async / await, which allows you to write
//   asynchronous code as if it were synchronous.
//
// General guidance:
//
// * When using promises, *always* add a `catch` handler. You should always
//   observe promise rejections.
//
// * Consider always rejecting with an `Error`. This will capture the stack
//   trace as part of the response.
//

import _ from "lodash";

//
// Creates a simple promise, chaining another promise to the first promise's
// success (then), and catching any errors that occur within the entire promise
// chain by attaching the `catch` last.
//
test("promises-basics", () => {

    expect.assertions(1);

    let p = new Promise((resolve) => {
        setTimeout(() => resolve("hello, world"), 50);
    })

    p.then((val) => {
        expect(val).toBe("hello, world");
    }).catch(() => {
        expect(false).toBeTruthy()
    });

    return p;
});

//
// Promises execute a function (the "executor") which accepts two callbacks:
//
// 1. The "resolve" callback which is invoked on success.
// 2. The "reject" callback which is invoked on failure.
//
// The executor must invoke one of the two callbacks. Invoking one of the
// callbacks is called "resolving" the promise.
//
// In this test, we create two promises that execute asynchronously. The first
// one succeeds, the second fails. We verify both the success and failure by
// attaching a `.then` and `.catch` respectively.
//
test("promises-resolution-and-rejection", () => {

    expect.assertions(2);

    let p = new Promise((resolve) => {
        setTimeout(() => resolve("done"), 50);
    }).then(val => {
        expect(val).toBe("done");
    }).catch(() => {
        expect(false).toBeTruthy(); // fail test - no promise should have been rejected.
    });

    let p2 = new Promise((undefined, reject) => {
        setTimeout(() => reject(new Error("err")), 50);
    }).then((val) => {
        expect(false).toBeTruthy(); // fail test - catch() should have been invoked.
    }).catch(err => {
        expect(err.message).toBe("err");
    });

    //
    // Promise.all will wait either:
    //
    // 1. All promises resolve.
    // 2. The first rejection occurs.
    //
    // If multiple promises reject, only the *first* rejection will
    // be handled.
    //
    return Promise.all([p, p2]);

});

//
// Shows how to attach multiple listeners to a promise and promise chaining with `then`.
//
test("promises-chaining", () => {

    // Two assertions will verify the top level callback returns "success".
    // The third assertion verifies the listenerOrder.
    expect.assertions(3);

    // Each listener will add it's value to `listenerOrder` to show the order in which
    // listeners are executed.
    let listenerOrder = [];

    //
    // The function you give to the promise is executed immediately.
    // It could return immediately or asychronously, either way,
    // any listener will be notified when it's complete.
    //
    var promise = new Promise((resolve) => {
        listenerOrder.push(0);
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
        // Since this is the first listener attached, it will be the first one invoked.
        listenerOrder.push(1);
    }).then(val => {
        // Note that another top level listener is added below, which will execute before
        // this chained promise.
        listenerOrder.push(3);
    }).then(val => {
        expect(_.isEqual([0, 1, 2, 3], listenerOrder)).toBeTruthy();
    });

    //
    // A promise can have multiple listeners.
    //
    // Important Note:
    //
    // This test shows how promise listeners are invoked in order they are
    // attached to the promise. This handler is attached at the top level
    // and executes before the chained `then` above.
    //
    // Do *not* write callbacks which depends on the ordering / existence of
    // other registered callbacks.
    //
    promise.then(val => {
        expect(val).toBe("success");
        listenerOrder.push(2);
    });

    return promise;
});

//
// Promises ensure that even if the promised is fulfilled synchronously, any
// callback you define with `then` will be still be invoked.
//
// This is critical as it ensures all subscribers are invoked regardless of when
// the promises completes, avoiding race conditions.
//
test("promises-guaranteed-callback-on-settlement", () => {

    expect.assertions(1);

    // Create a promise that is already resolved.
    let p = Promise.resolve(100);

    //
    // Even tho the promise is already resolved, any handler attached to the
    // promise will be invoked. This is a great feature, it ensures we do not
    // encounter race conditions when the promise is fulfilled before the
    // handler is attached.
    //
    let called = false;
    p.then(() => {
        called = true;
    }).then(() => {
        expect(called).toBeTruthy();
    });
    return p;
});

//
// Promise.all() is a "gate" to wait on 1->n parallel / concurrent tasks to
// finish before continuing.
//
test("promises-gating", () => {
    //
    // Promise.all takes an iterable of promises and itself returns
    // a promise that is resolved after all it's promises are resolved.
    //
    let p1 = new Promise((resolve) => {
        setTimeout(() => resolve(1), 50);
    });
    let p2 = new Promise((resolve) => {
        setTimeout(() => resolve(2), 10);
    });

    return new Promise((resolve, reject) => {
        //
        // Results will be returned in the order they are given to Promise.all()
        //
        let p3 = Promise.all([p1, p2]);
        p3.then(value => {
            expect(_.isEqual([1, 2], value)).toBeTruthy();
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
        reject(new Error("bad"));
    });

    // Always attach a `catch` to every promise, including the results from Promise.all()
    return Promise.all([p1, p2])
        .then(val => {
            // will *not* fire, even tho `p1` resolved successfully.
            expect(false).toBeTruthy();
        }).catch(err => {
            expect(err.message).toBe("bad");
            expect(_.isEqual(new Set(["p1", "p2"]), executedPromises)).toBeTruthy();
        });
});

//
// Only the first parameter sent to resolve() or reject() will be delivered to
// the handler. This should be caught by a compiler / linter.
//
test("promise-single-return-value", () =>  {

    let p = new Promise((resolve) => {
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
        return new Promise((resolve) => {
            setTimeout(() => {
                results.add(2);
                resolve(2);
            }, 100);
        })
    }).then(val => {
        expect(_.isEqual(new Set([1, 2]), results)).toBeTruthy();
    });
});



// ----------------------------------------------------------------------------
// ----------------------------------------------------------------------------


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
// If you omit the second (by using `null`), an implicit handler will be created
// which simply throws the value.
//
// ------------------------------------------------------------------------
// This:
//
// p.then(undefined, (err) => console.log(err));
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
// p.then((val) => { console.log(val); }, (err) => { throw err; }
// );
//
// Always include an exception handler, even if just for logging, at the end of
// your promise chain.
//
test("error-handling", () => {

    expect.assertions(1);

    const p = new Promise((undefined, reject) => {
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

    let p = Promise.resolve("done");
    p.then(value => {
        let x = z; // ReferenceError - `z` is not defined.
        expect(true).toBeFalsy(); // execution will *not* get here.
    }).then(value => {
        expect(true).toBeFalsy(); // execution will *not* get here.
    }).catch(err => {
        expect(err instanceof ReferenceError).toBeTruthy();
    });

    return p;
});
