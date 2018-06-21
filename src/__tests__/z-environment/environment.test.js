"use strict";

//
// environment.test.js
//
// This file contains tests which show the javascript execution
// environment. Javascript's environment is not as clean as other 
// languages. Javascript is based on global variables. 
//
// Tests in this file show:
//
// * The use of strict mode (and how to detect strict mode).
// * Scoping. Shows javascript's lexical scoping rules.
//  


//
// A function to check if we are running in strict mode. 
//
// When we are running in strict mode, `this` will *not* 
// point at `global`.
//
const isStrictMode = function() {
    return !this;
}


// 
// Verify we are in strict mode. 
//
// The tests in this file require strict mode.
//
test("check strict mode", () => {
    expect(isStrictMode()).toBeTruthy();

    // In strict mode, we don't have access to the global
    // environment.
    expect(global).not.toBeUndefined();

});


//
// Javascript is lexically scoped. 
//
// Each block introduces a new scope.
//
let x = 10;

test("scope", () => {

    // We have access to our parent scope.
    expect(typeof x).toBe("number");

   // Define a new block to introduce a new scope.
   {
        let y = 11;
    }
    expect(typeof y).toBe("undefined");

    // Attempting to reference y will result in a ReferenceError.
    // A ReferenceError is *always* thrown when a variable cannot 
    // be found.

});

//
// We are able to cheat lexical scoping by using eval.
//
// Don't ever use eval. It's full of security and performance problems.
//
test("using eval to cheat lexical scope", () => {

    let a = 10;

    let f = (str) => {
        return eval(str);
    };

    // eval() executes within the current lexical scope, 
    // therefore it has access to `a`.
    expect(f("(() => { let b = 20; a += 1; return a + b; })()")).toBe(31);

    // eval updated `a`, verify the update exists in our scope.
    expect(a).toBe(11);

});

// 
// `var` declarations is hoisted in JS. Therefore, you can reference 
// variables before they are declared. You shouldn't ever do this,
// but hey, you can! 
//
// *** Don't use var! Use let and const. ***
//
test("hoisting", () => {

    a = 10;

    expect(a).toBe(10);

    var a;
});

//
// The `this` pointer in a function is most likely one of the most confusing
// aspects of ES.
// 
// Depending on how a function is invoked, it may or may not have a `this` pointer.
// 
// * Using "." notation, `this` will refer to the object upon which the function is invoked.
// * using "call" notation, `this` is passed as an argument to call().
// 
// The vast majority of the time, `this` will be the object associated with the invocation.
//
test("this and global", () => {

    //
    // `this` is treated differently depending on if we are running in strict mode.
    // 
    // Strict mode: `this` is undefined.
    // Sloppy mode: `this` === `global`
    //
    let bar = "global";

    function f() {
        return this === undefined ? undefined : this.bar;
    }

    let obj1 = {
        bar : "obj1",
        foo : f
    };

    let obj2 = {
        bar : "obj2"
    };

    expect(isStrictMode()).toBeTruthy();
    expect(f()).toBe(undefined);

    // `this` is bound to `obj1` in `foo`
    expect(obj1.foo()).toBe("obj1");
    
    // An example of explicitly setting `this` to `obj2`
    expect(f.call(obj2)).toBe("obj2");
});

//
// `this` is bound based on how the function is invoked.
test("this and invocation", () => {

});
