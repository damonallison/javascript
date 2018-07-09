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
// * Always `throw new Error("message")` objects - this will capture stack traces.
//

test("simple-promise", () => {

    var promise = new Promise((resolve, reject) => {

        // do something async.
        setTimeout(() => {
            if (1 == 1) {
                resolve("success");
            } else {
                //
                // It's customary, but not required, to throw an Error object on faulure.
                // `Error` objects capture a stack trace.
                //
                // Throwing an error is the same as, but cleaner, than doing:
                //
                // reject(Error("failure");
                // return;)
                //
                throw new Error("failure");
            }
        }, 50 /* ms */);
    });

    // Note the promise chain (then / catch) next is *always invoked*.
    promise.then(success => {
        expect(success).toBe("success");
        return "successful";
    }).catch (err => {
        expect(err).toMatch("failure");
        return "failed";
    }).then(val => {
        // this chained promise will be invoked in both
        // success and failure cases.
        expect(val).toBe("successful");
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
