import { expect, test } from "vitest";
import _ from "lodash";

//
// Scoping Tests
//
// This file contains tests which show the javascript execution
// environment.
//
// Javascript has two modes of execution - strict and non-strict mode.
//
// Tests in this file show:
//
// * The use of strict mode (and how to detect strict mode).
// * Scoping. Shows javascript's lexical scoping rules.
//

//
// Strict Mode
//
// At some point, someone decided that JS needed a completely different "mode"
// to restrict JS. This is called "strict mode". Strict mode is on by default in
// ES6 classes and should *always* be enabled.
//
// A function to check if we are running in strict mode.
//
// * `this` is undefined at global scope (which `isStrictMode` is defined here
//   as) with strict mode enabled.
//
function isStrictMode() {
  return this === undefined;
}

//
// Verify we are in strict mode.
//
// Many tests in this file require strict mode,
// so verify it's set.
//
test("check strict mode", () => {
  expect(isStrictMode()).toBeTruthy();
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
// Before ES6, all vars were function or globally scoped.
//
// ES6 introduces lexically scoped vars in the form of `let` and `const` vars.
//
// `const` : read only, block based. Only the reference is immutable, the contents
//           of an object pointed to by a const can change.
// `let`   : block based. Use instead of `var`.
//
// Use `const` by default for immutability, `let` otherwise.
//
//
// ES6 binding guidelines:
//
// 1. Always use `const` or `let`. Prefer `const` wherever possible. Never use `var`.
// 2. In `for` loops, *always* use `let`.
//
test("block-bindings", () => {
  const x = 10;

  //
  // With object consts, only the reference is fixed.
  // The contents of the reference can change.
  //
  const obj = { name: "damon" };
  obj.name = "cole";
  expect(obj.name).toBe("cole");

  let funcs = [];
  for (let i = 0; i < 10; i++) {
    //
    // a new value for `i` is created at every iteration.
    // allowing us to capture the current value in a function.
    //
    funcs.push(() => {
      return i;
    }); // i is captured as 0, 1, 2, 3...
  }

  for (let i = 0; i < funcs.length; i++) {
    expect(funcs[i]()).toEqual(i);
  }

  // for-in iterates object members.
  for (let key in obj) {
    // key scoped here
    expect(key).toEqual("name");
  }

  // for-of iterates an iterable
  const a = [1, 2, 3];
  let b = [];
  for (let val of a) {
    b.push(val);
  }
  expect(_.isEqual(a, b)).toBeTruthy();
});

//
// We are able to cheat lexical scoping by using eval.
//
// **Don't ever use eval.**
//
//  It's full of security and performance problems.
//
test("using-eval-to-cheat-lexical-scope", () => {
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
