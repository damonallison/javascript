//
// ES6 formalizes Promises.
//
// Promises are an improved version of event handlers and callbacks.
//
// * Event handlers do not allow you to chain multiple operations.
// * Callbacks put you in callback hell.
// * Callbacks do not allow you to run multiple operations at a time.
//
// General guidance:
// * When using promises, *always* add a `catch` handler.
// * Consider always rejecting with an `Error`. This will capture the stack
//   trace as part of the response.
//

const arrayEquals = require('array-equal');
const setEquals = require('sets-equal');

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
    }).catch (err => {
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
        expect(setEquals(new Set(["success", "successful"]), results)).toBeTruthy();
    });

    //
    // A promise can have multiple listeners.
    //
    // Obviously this is *not* the same as chaining listeners.
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
    promise.then((val) => {
        listenerOrder.push(3);
        expect(arrayEquals([1, 2, 3], listenerOrder)).toBeTruthy();
    });

    return promise;
});

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
    // Promise.all takes an iterable of promises and itself returns
    // a promise that is resolved after all it's promises are resolved.

    let p1 = new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 100);
    });
    let p2 = new Promise((resolve, reject) => {
        setTimeout(() => resolve(2), 200);
    });

    return new Promise((resolve, reject) => {
        let p3 = Promise.all([p1, p2]);
        p3.then(value => {
            expect(value).toEqual([1, 2]);
            resolve();
        }).catch(error => {
            throw error;
        });
    });
});
