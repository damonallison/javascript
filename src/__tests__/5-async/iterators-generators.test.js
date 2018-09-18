"use strict";

const _ = require("lodash");

//
// Generators / Iterators
//
// Iterators
// ---------
// An iterator is an object which keeps track of its current position and knows
// how to access one object at a time. Arrays, Sets, Maps are examples of iterable objects.
//
// An iterator is an object with a `next()` function which returns the next `IteratorResult`.
//
// An IteratorResult is an object with an optional `value` property and a boolean `done` property.
//
// {
//   value: "anything",
//   done: true
// }
//
// The following built-in objects provide iterables:
//
// * Array
// * String
// * Generators
// * Collections
//
//
// Generators
// ----------
// Generators create iterators. You must call .next() to start or resume an
// iterator.
//
// When to use generators?
// * To produce an iterable series of values.
//   * Random numbers
//   * A queue of tasks to perform serially.
//
// For more information on Iterators / Generators:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
//


//------------------------------------------------------------------------
//
// Iterators
//
//------------------------------------------------------------------------
//
// Use for...of to iterate an iterator.
//
// * for...of will automatically stop when receiving `done: true` from the
//   iterator.
// * for...of calls .next() for you - you cannot pass arguments into .next().
// * for...of iterates an *iterator*, where for...in will loops over enumerable
//   property names of an object.
//

//
// Built-in javascript collections (Array, Map, Set) are all iterables.
//
test("built-in-array-iterable", () => {
    const a1 = ["damon", "ryan", "allison"];
    const arrayVals = [];

    for(let val of a1) {
        arrayVals.push(val);
    }
    expect(_.isEqual(a1, arrayVals)).toBeTruthy();
});

test("built-in-map-iterable", () => {
    const m1 = new Map([["one", 1], ["two", 2], ["three", 3]]);

    const keys = new Set();
    const vals = new Set();

    for([key, val] of m1) {
        keys.add(key);
        vals.add(val);
    };
    expect(_.isEqual(keys, new Set(["one", "three", "two"]))).toBeTruthy();
    expect(_.isEqual(vals, new Set([1, 3, 2]))).toBeTruthy();
});

test("built-in-set-iterable", () => {
    const keys = new Set(["one", "two", "three"]);
    const keys2 = new Set();
    for (let key of keys) {
        keys2.add(key);
    }
    expect(_.isEqual(keys, keys2)).toBeTruthy();
});


//
// Custom iterator
//

//
// An iterator is any object with a .next() function that returns objects of:
//
// {
//   value: "val",
//   done: true | false
// }
//
// Any iterator is made iterable by including a special [Symbol.iterator] member
// on the iterator.
//
// While custom iterators are useful, they are error prone since they must
// maintain their internal state.
//
test("custom-iterable", () => {

    let pairIterator = {
        currentPos: 0,
        left: "left",
        right: "right",

        //
        // Make the object an iterator by including a `next` function.
        //
        // It must return a proper `IteratorResult` object of the form:
        //
        // {
        //   value: "value",
        //   done: false
        // }
        //
        // Do not return `done: true` with the last object in the iteration.
        // Always return `value: undefined` when `done: true` to avoid an
        // off by one error during `for...of` iteration.
        //
        next() {
            this.currentPos++;
            if (this.currentPos == 1) {
                return { value: this.left, done: false };
            } else if (this.currentPos == 2) {
                return { value: this.right, done: false };
            }
            return { done: true }
        },
        // Make this iterator iterable.
        [Symbol.iterator]() {
            return this;
        }
    };

    let results = [];
    for(let val of pairIterator) {
        results.push(val);
    }

    expect(_.isEqual(["left", "right"], results)).toBeTruthy();

});

//
// Arrays, Sets, and Maps are all iterables.
//
// In this example, our custom iterable object uses the Array iterable.
//
test("custom-iterable-using-array", () => {

    let myIterable = {
        values: [1, 2, 3],
        [Symbol.iterator]() {
            return this.values[Symbol.iterator]();
        }
    }

    const expected = [1, 2, 3];
    const results = [];

    for (let val of myIterable) {
        results.push(val);
    }
    expect(_.isEqual(expected, results)).toBeTruthy();

    // The rest / spread operator can also be used to exhaust an iterable.
    expect(_.isEqual([ ...myIterable], results)).toBeTruthy();
});



//
// Generators
//
// A generator is a special function which is a factory for iterators. Calling a
// generator function returns a new iterator.
//
// Each `yield` statement in the generator function becomes one element of the iterable.
//

//
// This test creates a generator and manually advances the returned iterator,
// allowing us to verify the generator suspends execution on yield.
//
test("generator-manual", () => {

    let activity = []; // track the order of operations
    let x = 1;

    function* gen() {
        activity.push("before yield");
        yield 10;
        activity.push("after yield");
        expect(x).toBe(100);
    };

    activity.push("acquiring iterator");

    // Calling the generator function returns an iterator. Execution does *not* begin.
    let it = gen();
    activity.push("acquired iterator");

    // Verify that gen() has not began. We have only acquired an iterator.
    expect(_.isEqual([
        "acquiring iterator",
        "acquired iterator"
        ], activity)).toBeTruthy();

    const val = it.next();

    // We have now began the iterator. Verify that execution stopped at `yield 10`.
    expect(_.isEqual([
        "acquiring iterator",
        "acquired iterator",
        "before yield"
        ], activity)).toBeTruthy();

    //
    // The generator is currently paused at the yield statement and is not complete.
    //
    expect(val.value).toBe(10);
    expect(val.done).toBeFalsy();
    activity.push(`yielded ${val.value}`);

    //
    // Resume the generator. Because it does not yield any further values, it is
    // complete.
    //
    // We will also alter `x` to illustrate that the generator was truly paused
    // and when resumed will have access to the updated lexical scope.
    //
    x = 100;
    activity.push("resuming iterator");
    expect(it.next().done).toBeTruthy();
    activity.push("done");

    // console.log(activity);

    expect(_.isEqual(
            ["acquiring iterator",
             "acquired iterator",
             "before yield",
             "yielded 10",
             "resuming iterator",
             "after yield",
             "done"],
             activity)).toBeTruthy();
});

//
// This test shows a more common use of creating and using generator functions.
//
// The iterator yields multiple results, and we use for...of to walk the iterator.
//
test("generator-iteration", () => {

    let double = (x) => x * 2;

    function* repeat(fun, times) {
        for(let i = 0; i < times; i++) {
            yield fun(i);
        }
    }

    let results = [];

    // Acquire a new iterator.
    let iterator = repeat(double, 3);

    for (let val of iterator) {
        results.push(val);
    }
    expect(_.isEqual([0, 2, 4], results)).toBeTruthy();

    //
    // Or you could manually iterate. This is uglier than for...of
    // but it allows you to pass values into .next(). Generators allow
    // for two way message passing. You can pass values into .next(),
    // in addition to getting `yield`ed values out of the iterator.
    //
    results = [];
    let r = repeat(double, 3);
    for (let val; (val = r.next()) && !val.done;) {
        results.push(val.value);
    }
    expect(_.isEqual([0, 2, 4], results)).toBeTruthy();

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
    expect(_.isEqual([0, 2, 4, 6, 8, 10], results)).toBeTruthy();
});

//
// Yield is an interesting keyword. It can yield a value, it can also receive
// values from .next().
//
// This two-way message passing allows you to send values into the generator, as
// well as receive values out of the generator.
//
test("generator-providing-values-to-yield", () => {

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
// Yield Delegation
//
// Yield delegation allows you to delegate your iterator's control to another
// (child) iterator.
//
// yield * accepts an iterator and delegates it's control to that iterator until
// it's exhausted.
//
test("generator-yield-delegation", () => {

    function *genValues(x) {
        for (let i = 0; i < x; i++) {
            yield i;
        };
    };

    function *delegator(x) {
        yield "starting";
        //
        // Delegate this iterator's control to the `child`
        yield *genValues(x);
        yield "ending";
    };

    const d = delegator(2);
    expect(_.isEqual(["starting", 0, 1, "ending"], [...d])).toBeTruthy();

});