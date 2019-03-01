"use strict";

import _ from "lodash";

//
// Async / Await
//
// Asychronous functions operate asychronously via the event loop. Asychronous
// functions always return `Promise` objects.
//
// `async` / `await` combines generators and promises to allow writing
// asychronous code in a synchronous style.
//
// async / await was added to Chromium 5.5, Chrome 55, and Node 7.6.
//
// Any function that returns a promise should be an async function.
//

//
// An example of an async function.
//
// Notice the jest test accepts an async function (async () => { }). This test
// function *must* return a promise or an await statement (which is a promise).
//
// Jest will wait for the returned promise to resolve. If the returned promise
// is rejected, and you expected success, the test will fail.
//
// This test shows how to use jest to assert a promise is resolved successfully.
//
test("async-await", async () => {

    //
    // async functions *always* return a promise.
    //
    // This example shows that `await` will pause execution until an entire
    // promise chain is unwound and the outermost promise is resolved.
    //
    async function run(func, ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(func())
            }, ms);
        });
    };
    // The "resolves" assertion verifies the promise resolves correctly.
    await expect(run(() => "hello, world", 50)).resolves.toBe("hello, world");
});

//
// Any function can be marked "async". The return value will be
// wrapped up in a promise.
//
test("async-await-normal-function-return", async () => {

    expect.assertions(3);
    //
    // While this function is not "async" in the sense it does work
    // asynchronously, it does return a promise. The `async` function
    // modifier ensures a promise is returned.
    //
    async function echo(val) {
        return val
    }

    const ret = echo("test");
    expect(ret instanceof Promise).toBeTruthy(); // Verify a promise is returned.

    //
    // Handle the promise returned from an async function in the same fashion as you
    // would for any other promise.
    //
    ret.then(val => {
        expect(val).toBe("test");
    });

    //
    // await handles all the promise unwrapping / error handling for you.
    //
    await expect(echo("test")).resolves.toBe("test");
});


//
// Rejected promises throw catchable errors.
//
test("async-await-error-handling", async () => {

    expect.assertions(2);

    async function reject(ms) {
        return new Promise((undefined, reject) => setTimeout(() => reject(new Error("error"))), ms);
    }

    //
    // Rejected promises will fall into the `catch` block.
    //
    try {
        await reject(50)
        expect(false).toBeTruthy(); // fail test - should not be here.
    }
    catch(error) {
        expect(error.message).toBe("error");
    }

    //
    // Using jest, a "rejects" assertion will verify the rejection. Use this
    // as shorthand for the try / catch above when writing tests.
    //
    await expect(reject(50)).rejects.toEqual(new Error("error"));

});

//
// If you have multiple tasks to execute in parallel, ensure you begin all the
// tasks in parallel - not `await`ing on each one serially.
//
// This will ensure the overall execution time for all tasks will be capped at
// the longest running task.
//
// Launch multiple tasks in parallel.
//
test("parallel-await", async() => {

    expect.assertions(2);

    let run = async (ms) => new Promise(resolve => setTimeout(() => resolve(ms), ms));

    // Start two promises in parallel.
    const x = run(100);
    const y = run(200);

    // Await on both.
    const resultX = await x;
    const resultY = await y;

    // The total execution time for both tasks will be ~200ms.
    expect(resultX).toBe(100);
    expect(resultY).toBe(200);
});

//
// Executes an array of promises in parallel, awaits on the results.
//
test("parallel-await-with-array", async () => {

    let run = async (ms) => new Promise(resolve => setTimeout(() => resolve(ms), ms));

    let values = [10, 20, 30, 40, 50];

    //
    // We will assert the entire array once, in addition to one assertion per element.
    //
    expect.assertions(values.length + 1);

    //
    // Launch multiple promises in parallel.
    //
    const promises = values.map(async element => {
        return run(element);
    });

    //
    // You can wait for all with Promise.all(), highlighting the fact
    // that async functions simply return regular promises.
    //
    let all = Promise.all(promises);
    all.then(vals => expect(_.isEqual(vals, values)).toBeTruthy());

    //
    // Read the results. The time to await all promises is 50 ms,
    // the longest value in the values array which we are waiting on.
    //
    for (let i = 0; i < values.length; i++) {
        let result = await promises[i];
        expect(result).toBe(values[i]);
    }
});

