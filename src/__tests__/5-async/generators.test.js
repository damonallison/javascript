"use strict";
//
// Generators / Iterators
//
// An iterator is an object which keeps track of its current position and knows
// how to access one object at a time. Arrays, Sets, Maps are examples of iterable objects.
//
// You can write a custom iterator by creating an object which keeps track of it's
// current position and has a .next() function.
//
//
// * Generators express async control flow in a sequential fashion.
// * Generators create iterators. You must call .next() to start or resume an
//   iterator.
//
// For more information on Iterators / Generators:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
//
const arraysEqual = require("array-equal");


//
// Iterators
//


test("simple-iterable", () => {

    const a = [1, 2, 3];

    const results = [];

    //
    // Use for...of to iterate an iterator.
    //
    // * for...of will automatically stop when receiving `done: true` from the
    //   iterator.
    // * for...of calls .next() for you - you cannot pass arguments into .next().
    // * for...of iterates an *iterator*, where for...in will loops over enumerable
    //   property names of an object.
    //
    for(let val of a) {
        results.push(val);
    }

    expect(arraysEqual([1, 2, 3], results)).toBeTruthy();
});

//
// An iterator is any object with a .next() function that returns objects of:
//
// {
//   value: "val",
//   done: true | false
// }
//
// You can use for...of to iterate over an iterable object.
//
// Use the ES6 special iterator symbol `Symbol.iterator` to return an iterator.
//
//
// Create a true custom iterator object (without piggybacking on Array as we did
// above).
//
// While custom iterators are useful, they are error prone since they must
// maintain their internal state.
//
test("custom-iterable", () => {

    let pairIterator = {
        currentPos: 0,
        left: 1,
        right: 2,
        next() {
            this.currentPos++;
            if (this.currentPos == 1) {
                return { value: this.left, done: false };
            } else if (this.currentPos == 2) {
                return { value: this.right, done: false };
            }
            return { value: undefined, done: true }
        },
        [Symbol.iterator]() {
            return this;
        }
    };

    let results = [];
    for(let val of pairIterator) {
        results.push(val);
    }

    expect(arraysEqual([1, 2], results)).toBeTruthy();

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

    const results = [];

    for (let val of myIterable) {
        results.push(val);
    }
    expect(arraysEqual([1, 2, 3], results)).toBeTruthy();
});


//
// Generators
//
// A generator is a special function which is a factory for iterators.
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

    let it = gen(); // Calling the generator function returns an iterator.
    activity.push("acquired iterator");

    const val = it.next();
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

    expect(arraysEqual(
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

    //
    // for...of simplifies consuming the iterator. for...of will call .next()
    // for us, as well as terminate when the iterator is done.
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