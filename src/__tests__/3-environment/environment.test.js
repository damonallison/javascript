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
// Many tests in this file require strict mode, 
// so verify it's set.
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
// This variable is declared at `global` scope.
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
// **Don't ever use eval.**
//
//  It's full of security and performance problems.
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
// but hey, it's javascript - you can! 
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
test("this binding", () => {

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

    //
    // Example of "default binding".
    //
    // Here, f() is invoked without an inplicit `this` reference (i.e., obj.f()), 
    // therefore the global binding rule applies. In strict mode, `this` within f()
    // will be undefined.
    //
    expect(f()).toBe(undefined);

    // 
    // Example of "implicit binding"
    //
    // `this` is implicity bound to `obj1` in `foo`.
    expect(obj1.foo()).toBe("obj1");
    
    // 
    // Example of "explicit binding"
    //
    // An example of explicitly setting `this` to `obj2` using `call` and `apply`
    //
    // `call` accepts an arguments list.
    // `apply` accepts a single array of arguments.
    //
    expect(f.call(obj2)).toBe("obj2");
    expect(f.apply(obj2, [])).toBe("obj2");

    //
    // Example of "hard binding" (using bind)
    //
    // `bind` creates a new function which "hard binds" 
    // `this` to the value `obj1` 
    let x = f.bind(obj1);

    expect(x()).toBe("obj1");
});

//
// "new" binding
//
// Any function can be called with `new` in front of it. 
// This is called a "constructor call".
//
// 1. A new JS object is created.
// 2. The new object becomes `this` for the life of the function call.
// 3. Unless the function returns it's own object, the newly constructed 
//    object is returned.
//
// Note that this function could be converted to an ES2015 class (which is preferred).
test("new binding", () => {

    // An example constructor function.
    function Person(fName, lName, age) {
        this.firstName = fName;
        this.lastName = lName;
        this.age = age;
    }

    // class Person {
    //     constructor(fName, lName, age) {
    //         this.firstName = fName;
    //         this.lastName = lName;
    //         this.age = age;
    //     }
    // }

    let p = new Person("damon", "allison", 41);

    expect(p.firstName).toBe("damon");
    expect(p.lastName).toBe("allison");
    expect(p.age).toBe(41);
    
});

// 
// "this" binding rules.
//
// 1. If the function is called with "new", this is bound to the newly created object.
// 2. If the function is called with explicit binding (foo.call(obj)), this becomes the given object.
// 3. If the function is called within a context, or owning object, (obj.foo(1)), use the owning object.
// 4. Use the default binding.
//


//
// ES6 introduces arrow functions.
//
// Instead of using the 4 standard "this" binding rules, 
// arrow functions adopt the `this` binding from the enclosing
// function or global scope.
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