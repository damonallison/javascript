"use strict";
//
// Generators / Iterators
//
// * Generators express async control flow in a sequential fashion.
// * Generators create iterators. You must call .next() to start or resume an iterator.
//

const arraysEqual = require("array-equal");

test("simple-generator", () => {

    let activity = []; // track the order of operations
    let x = 1;

    function* gen() {
        activity.push("before yield");
        yield;
        activity.push("after yield");
        expect(x).toBe(100);
    };

    activity.push("acquiring generator");

    //
    // Generators are different than function calls. You must create an instance
    // of a generator and call .next() on it to begin or resume execution.
    //
    let f = gen(); // acquire a generator instance
    activity.push("acquired generator");
    f.next(); // start the gen() generator.
    x = 100;
    activity.push("resuming generator");
    f.next(); // resume from yield
    activity.push("done");

    expect(arraysEqual(
            ["acquiring generator",
             "acquired generator",
             "before yield",
             "resuming generator",
             "after yield",
             "done"],
             activity)).toBeTruthy();
});

//
// In JS, an iterator is any object which knows how to access a collection one
// element at a time, keep it's current position, and has a .next() method.
//
// Use for...of to iterator over an iterator object.
// * for...of will automatically stop when receiving `done: true` from the iterator.
// * for...of calls .next() for you - you cannot pass arguments into .next().
//
// * String, Array, Map, Set are examples of built-in iterables.
//
test("looping-an-iterator", () => {

    let double = (x) => x * 2;

    function* repeat(fun, times) {
        for(let i = 0; i < times; i++) {
            yield fun(i);
        }
    }

    let results = [];

    //
    // for...of simplifies consuming an iterator.
    //
    for (let val of repeat(double, 3)) {
        results.push(val);
    }
    expect(arraysEqual([0, 2, 4], results)).toBeTruthy();

    //
    // Or you could manually iterate. This is uglier than for...of
    // but it allows you to pass values into .next()
    //
    results = [];
    let r = repeat(double, 3);
    for (let val; (val = r.next()) && !val.done;) {
        results.push(val.value);
    }
    expect(arraysEqual([0, 2, 4], results)).toBeTruthy();

    //
    // You can manually terminate a generator by calling .return()
    //
    results = [];
    r = repeat(double, 10);
    for (let val of r) {
        if (val >= 10) {
            // Manually terminate generator.
            r.return();
        }
        results.push(val);
    }
    expect(arraysEqual([0, 2, 4, 6, 8, 10], results)).toBeTruthy();
});

//
// Yield is an interesting keyword. It can yield a value, it can also receive
// values from .next().
//
test("providing-values-to-yield", () => {

    function *addWhileLessThanX(x) {
        let sum = 0;
         // We *could* yield a value from the generator.
        let val = yield "begin";
        while (val < x) {
            sum += val;
            val = yield;
        }
        return sum;
    }

    let a = addWhileLessThanX(5);

    expect(a.next().value).toBe("begin");

    for (let i = 0; i <= 100; i++) {
        //
        // Give yield a value to resume with
        //
        let res = a.next(i);

        if (res.done) {
            // 0 + 1 + 2 + 3 + 4 == 10
            expect(res.value).toBe(10);
            break;
        }
        expect(i).toBeLessThanOrEqual(5);
    }
});

//
// Any object which provides an iterator is called an "iterable".
//
// Use the ES6 special iterator symbol `Symbol.iterator` to return an iterator.
//
test("custom-iterable", () => {

    let myIterable = {
        values: [1, 2, 3],
        [Symbol.iterator]() {
            return this.values[Symbol.iterator]();
        }
    }

    let results = [];
    var iterator = myIterable[Symbol.iterator]();
    for (let val of iterator) {
        results.push(val);
    }
    expect(arraysEqual([1, 2, 3], results)).toBeTruthy();

    results = [];
    //
    // for...of will retrieve the iterator from an iterable for you.
    //
    for (let val of myIterable) {
        results.push(val);
    }
    expect(arraysEqual([1, 2, 3], results)).toBeTruthy();
});