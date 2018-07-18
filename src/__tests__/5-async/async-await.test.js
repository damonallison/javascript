import { doesNotReject } from "assert";

"use strict";
//
// Async / Await
//
// `async` / `await` combines generators and promises to make writing
// asychronous code in a synchronous style.
//
// async / await was added to Chromium 5.5, Chrome 55, and Node 7.6.
//
// Any function that returns a promise should be an async function.
//

//
// An example of an async test.
//
// Notice the jest test accepts an async function. This test function *must*
// return a promise or an await statement (which is a promise).
//
// Jest will wait for the returned promise to resolve. If the returned promise is
// rejected, and you expected success, the test will fail.
//
// This test shows how to use jest to assert a promise is resolved successfully.
test("async-await", async () => {
    //
    // async functions *always* return a promise.
    //
    async function run(func, ms) {
        return new Promise(resolve => setTimeout(() => resolve(func()), ms));
    };
    // The "resolves" assertion verifies the promise resolves correctly.
    await expect(run(() => "hello, world", 50)).resolves.toBe("hello, world");
});


//
// An example showing how to use jest to assert a promise is rejected correctly.
//
test("async-await-reject-promise", async () => {
    async function reject(ms) {
        return new Promise((resolve, reject) => setTimeout(() => reject("error")), ms);
    }
    // A "rejects" assertion will verify the rejection.
    await expect(reject(50)).rejects.toBe("error");
});

//
// Launch multiple tasks in parallel.
//
test("parallel-await", async() => {


    let run = (ms) => new Promise(resolve => setTimeout(() => resolve(ms), ms));

    // Start two promises in parallel.
    const x = run(100);
    const y = run(100);

    // Await on both.
    const resultX = await x;
    const resultY = await y;

    expect(resultX).toBe(100);
    expect(resultY).toBe(100);


    //
    // Launch multiple promises in parallel.
    //
    let values = [10, 20, 30, 40, 50];
    const promises = values.map(async element => {
        return run(element);
    });

    //
    // Read the results. The time to await all promises is 50 ms,
    // the longest value in the values array which we are waiting on.
    //
    for (let i = 0; i < values.length; i++) {
        let result = await promises[i];
        expect(result).toBe(values[i]);
    }
});
