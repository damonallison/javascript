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

    let x = 10; // Update this value to trigger rejection.

    let results = new Set();
    let listenerOrder = [];

    //
    // The function you give to the promise is executed immediately.
    // It could return immediately or asychronously, either way,
    // any listener will be notified when subscribing
    //
    var promise = new Promise((resolve, reject) => {

        // do something async.
        setTimeout(() => {
            x == 10 ? resolve("success") : reject(new Error("failed"));
        }, 50 /* ms */);
    });

    //
    // Note the promise chain (then / catch) is *always invoked*.
    //
    promise.then(success => {
        listenerOrder.push(1);
        expect(success).toBe("success");
        results.add(success);
        return "successful";
    }).catch(err => {
        expect(err instanceof Error).toBeTruthy();
        expect(err.message).toBe("failed");
        return "failure";
    }).then(val => {
        //
        // this chained promise will be invoked in both
        // success and failure cases
        //
        expect(val).toBe("successful");
        results.add(val);
        return "final";
    }).then(val => {
        expect(val).toBe("final");
        expect(setsEqual(new Set(["success", "successful"]), results)).toBeTruthy();
    });

    //
    // A promise can have multiple listeners.
    //
    promise.then(
        (val) => {
            listenerOrder.push(2);
            expect(val).toBe("success");
        },
        (err) => {
            throw err;
        }
    );

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

    let called = false;
    p.then(value => {
        called = true;
    }).then(value => {
        expect(called).toBeTruthy();
    });
    return p;
});

test("multiple-promises", () => {
    //
    // Promise.all takes an iterable of promises and itself returns
    // a promise that is resolved after all it's promises are resolved.
    //
    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 100);
    });
    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => resolve(2), 200);
    });

    return new Promise((resolve, reject) => {
        let p3 = Promise.all([p1, p2]);
        p3.then(value => {
            resolve();
            expect(value).toEqual([1, 2]);
        }).catch(error => {
            reject(error);
        });
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
// Errors that occur in a `then` handler, will be handled to the `catch`.
//
test("promise-errors-call-reject", () => {

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