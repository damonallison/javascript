'use strict';

import _ from "lodash";

//
// this
//
// The `this` value is most likely one of the most confusing aspects of ES.
//
// `this` depends entirely on how the function is being *called* and can be
// different across function invocations.
//
// Therefore, from within the function, you do not know what `this` is going to
// point to. This ambiguity is the source of difficult to track down bugs. When
// writing the function, you have to either:
//
// 1. Assume. Assume that `this` will be an object you expect.
// 2. Program defensively. Write countless checks to verify the expected state
//    of `this`.
//
// ES has 4 function invocation types
// -----------------------------------
//
// 1. Function invocation. Invoking the function without a context.
//
// ```
// function echo(v) {
//   return v;
// }
// echo("hello, world!"); // function invocation
// ```
//
// In function invocation, `this` will depend on strict mode. If you are running
// in strict mode (which you should be), `this` will be `undefined`. If you are
// *not* running in strict mode, `this` will be the global object (`window` or
// `global`).
//
// 2. Method invocation. Invoking a function on an object. `this` == the object.
//
// 3. Constructor invocation. `new Regexp("\\d");`
//
// 4. Indirect invocation. `object.call(obj, "hello world");
//
// With indirect invocation (.call(), .apply(), or .bind()), you manually
// establish the context - you manually tell the function what it's `this` is
// going to be.
//
// In the above example, `this` is hardcoded to `obj`.
//
//
//
//
// Resources:
//
// A gentle explanation of `this` in JavaScript
// https://dmitripavlutin.com/gentle-explanation-of-this-in-javascript/
//

//
// Function invocation
//

//
// With function invocation:
// * `this` is undefined when running in strict mode.
// * `this` === global when running in non-strict mode. (Turn on strict mode!)
//
test("this-function-invocation", () => {
    // We are in 'use strict'; - making `this` undefined when called in function invocation.
    expect(this).toBeUndefined();
    function echo(val) {
        expect(this).toBeUndefined();
        return val;
    };
    expect(echo("42")).toBe("42");
});

//
// Function invocation *always* sets `this` to undefined or global, depending on
// strict mode - even with nested functions.
//
test("this-function-invocation-nested-function", () => {
    let obj = {
        myFunc() {
            //
            // Because this function is being invoked on `obj`, `obj` is the context.
            //
            expect(this).toBe(obj);
            function echo(val) {
                //
                // Even if `this` is defined in the myFunc() context, that
                // context does not matter. Because *this* function was called
                // using function invocation without a context, this is
                // undefined (we are in strict mode).
                //
                expect(this).toBeUndefined();
                return val;
            };
            return echo("hello, world!");
        }
    };

    //
    // Here, we are invoking `myFunc` using method invocation.
    // However, within `myFunc`, `echo` is invoked using function invocation.
    // Within `echo`, `this` will always be undefined.
    //
    expect(obj.myFunc()).toBe("hello, world!");
});

//
// Arrow functions will lexically bind `this` to what it is in the current context.
//
test("this-function-invocation-arrow-functions", () => {
    let obj = {
        getThis() {
            //
            // Capture this to verify the same object is lexically bound from
            // within the child `echo` function.
            //
            let that = this;
            let echo = (val) => {
                expect(that).toBe(this);
                return val;
            };
            return echo(this);
        }
    };

    //
    // In both of the following cases, `this` will be equal in both the parent
    // `getThis()` function and the child `echo()` function.
    //
    // They are equal because `this` in the child function is lexically bound to
    // the same `this` value in the parent function.
    //

    // Call using method invocation - this is bound to obj.
    expect(obj.getThis()).toBe(obj);

    //
    // Call using function invocation. `this` is always undefined
    // when using function invocation.
    //
    let f = obj.getThis;
    expect(f()).toBeUndefined();
});


//
// Method invocation
//

test("this-method-invocation", () => {

    let obj = {
        getThis() {
            return this;
        }
    };
    expect(obj.getThis()).toBe(obj);

    //
    // Remember that `this` is entirely based on how the method is invoked.
    // Here, we obtain a pointer to the method and invoke it using **function**
    // invocation, not method invocation.
    //
    // This is a common case in callbacks - when a function like `getThis` is
    // passed as a callback, it could be invoked using function invocation.
    //
    var gt = obj.getThis;
    expect(gt()).toBeUndefined();
});

//
// Constructor invocation
//

// When invoking a function with `new` in front of it.
//
// 1. A new JS object is created.
// 2. The new object becomes `this` for the life of the function call.
// 3. Unless the function returns it's own object, the newly constructed
//    object is returned.
//
test("this-constructor-invocation", () => {

    // An example constructor function (pre-ES6)
    function Person(fName, lName, age) {

        //
        // A check to verify we are being invoked as a constructor function.
        //
        if (!(this instanceof Person)) {
            throw new Error("Expected a `new` invocation.");
        };

        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
    }

    let p = new Person("damon", "allison", 41);
    expect(p instanceof Person).toBeTruthy();

    expect(p.firstName).toBe("damon");
    expect(p.lastName).toBe("allison");
    expect(p.age).toBe(41);

    //
    // Pitfall - ensure `new` is used when invoking a constructor function.
    //
    try {
        let p = Person("damon", "allison", 41);
        expect(true).toBeFalsy();
    }
    catch(err) {
        expect(err instanceof Error).toBeTruthy();
        expect(err.message).toBe("Expected a `new` invocation.");
    }
});

//
// Shows an ES6 "class" equivalent to the Person constructor function shown above.
//
test("this-class-constructor", () => {

    //
    // An example class definition (ES6)
    //
    class Person2 {
        //
        // Object initialization is handled by a special `constructor` function.
        //
        // Only **1** constructor function can be defined on a class.
        //
        constructor(fName, lName, age) {
            this.firstName = fName;
            this.lastName = lName;
            this.age = age;
        }
    }

    const p = new Person2("damon", "allison", 41);
    expect(p instanceof Person2).toBeTruthy();
    expect(p.firstName).toBe("damon");
    expect(p.lastName).toBe("allison");
    expect(p.age).toBe(41);

});



//
// Indirect invocation
//

//
// Indirect invocation is performed when a function is called using .call(),
// .apply(), or .bind()
//
// .call and .apply are *very* similar. The difference is `call` accepts a
// varArgs parameter, where `apply` accepts an argument array.
//
// .call(thisArg, arg0, arg1, arg2 ...); .apply(thisArg, [args]);
//
test("indirect-invocation", () => {

    function getThis() {
        return this;
    };
    function getThisAndArgs(arg1, arg2) {
        return [this, arg1, arg2];
    };

    let obj = {};

    //
    // .call
    //
    expect(getThis.call(obj)).toBe(obj);
    expect(_.isEqual(getThisAndArgs.call(obj, 1, 2), [obj, 1, 2])).toBeTruthy();

    //
    // .apply
    //
    expect(getThis.apply(obj)).toBe(obj);
    expect(_.isEqual(getThisAndArgs.apply(obj, [1, 2]), [obj, 1, 2])).toBeTruthy();


    //
    // .bind
    //
    // `bind` creates a new function which "hard binds" `this` to the given value.
    //
    let f = getThis.bind(obj);
    expect(f()).toBe(obj);

    //
    // Once a function is bound with `bind`, this will *always* equal the bound
    // value.
    //
    // Here, we try to rebind `this` to a new object, but `this` is still being
    // bound to the object we bound to (obj).
    //
    expect(f.call({})).toBe(obj);
});

//
// ES6 introduces arrow functions.
//
// Instead of using the 4 standard "this" binding rules, arrow functions adopt
// the `this` binding from the lexically enclosing function or global scope.
//
// This is great, since there is no ambiguity of what `this` points to.
//
test("lexical this (arrow functions)", () => {

    function foo() {
        return () => {
            // `this` here is lexically scoped from `foo`
            return this.a
        };
    };

    let obj1 = {
        a: 2
    };
    let obj2 = {
        a: 3
    };

    expect(foo.call(obj1)()).toBe(2);
    expect(foo.call(obj2)()).toBe(3);

});