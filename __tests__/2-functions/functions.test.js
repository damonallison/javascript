import { expect, test } from "vitest";
import _ from "lodash";

//
// Functions
//
// Functions in ES are first class.
//
// ES6 cleans up functions in the following ways:
//
// * Default parameter values.
//
// * Varadic parameters ("rest" parameters). These eliminate the need for the
//   implicit (and long deprecated) `arguments` parameter you could use from
//   within a function.
//
//   * Don't ever use the `arguments` implicit parameter!
//
// Problems with javascript functions:
//
// * Arguments
//
//   Javascript does not require you call a function with the same number of
//   arguments as the function defines. If you call a function with fewer
//   arguments than defined, the remainder will be `undefined`. If you call with
//   more, the extra fall off.
//
// * Default values
//
//   In ES5, the logical || operator was used to default values. The problem
//   with || is you may want to pass a falsy value as an argument (i.e., 0).
//   Therefore, || should *not* be used. use (typeof arg !== "undefined") ? arg1
//   : "default value"
//
//   Safe way to set default values:
//
//      let v = typeof arg !== "undefined" ? arg : {}
//
//  * Javascript adds an `arguments` array-like object (but it's not actually an
//    array, oy..) to every function. This is a hack. Callers do not know they
//    can pass additional arguments to a function by looking at its definition.
//    Don't use `arguments`
//
test("closures", () => {
  let a = 0;

  let makeIncrementer = () => {
    return () => {
      a += 1;
      return a;
    };
  };

  let m = makeIncrementer();

  a = 10;

  expect(m()).toBe(11);
  expect(m()).toBe(12);

  expect(a).toBe(12);
});

//
// Default argument values.
//
// One of the biggest hacks of javascript is you can invoke a function without
// using the correct number of arguments.
//
test("default arguments are undefined", () => {
  let calledArg1;
  let calledArg2;

  const func = (arg1, arg2) => {
    //
    // Dont use `arg1 || "default" - allows you to send a falsy value in for arg1.
    //
    calledArg1 = arg1 !== undefined ? arg1 : "default";
    calledArg2 = arg2 !== undefined ? arg2 : "default";
  };

  func("one"); // This is disgusting. It should throw an error.

  expect(calledArg1).toEqual("one");
  expect(calledArg2).toEqual("default");
});

//
// ES6 default values
//
// If an undefined value is passed to a function, the default value
// will be used.
//
test("default argument values", () => {
  let calledArg1;
  let calledArg2;

  expect(calledArg1).toBe(undefined);
  expect(calledArg2).toBe(undefined);

  const func = (arg1, arg2 = "default") => {
    calledArg1 = arg1;
    calledArg2 = arg2;
  };

  func("one");
  expect(calledArg1).toBe("one");
  expect(calledArg2).toBe("default");

  func("one", undefined);
  expect(calledArg1).toBe("one");
  expect(calledArg2).toBe("default");

  func();
  expect(calledArg1).toBeUndefined();
  expect(calledArg2).toBe("default");
});

//
// Default Parameter Expressions
//
// In ES6, default parameters can be expressions.
// Remember: Expressions are only executed when there is no default value.
//
test("default parameter expressions", () => {
  let val = 10;
  function getValue() {
    val = val + 1;
    return val;
  }
  const func = (arg1, arg2 = getValue()) => {
    return arg2;
  };

  expect(func(1)).toEqual(11);
  expect(func(1)).toEqual(12);

  expect(val).toBe(12);

  // Because arg2 is specified, getValue() will not be called.
  expect(func(1, 2)).toBe(2);
  expect(val).toBe(12);
});

//
// ES6 introduces a `rest` / `spread` operator (...arg2) to replace `arguments`.
//
// When used in a function declaration, the "rest" operator gathers all
// values into the array (use `...` as the last param).
//
test("es6-variadic-parameters", () => {
  let vars = [];
  const test = (arg1, ...arg2) => {
    //
    // If ...arg2 receives nothing, it will still be a valid array.
    //
    expect(arg2 instanceof Array).toBeTruthy();
    expect(arg2.length).toBeGreaterThanOrEqual(0);
    vars = arg2;
  };

  test("damon", "grace", "lily", "cole");
  expect(_.isEqual(["grace", "lily", "cole"], vars)).toBeTruthy();

  test("damon");
  expect(vars.length).toBe(0);

  // The "spread" operator (also ...) allows you to split an array to
  // use the arguments as inputs to a variadic parameter.
  const names = ["kari", "grace", "lily", "cole"];

  // You can also add additional arguments before / after the spread
  // argument as well.
  test("damon", ...names, "roxie");
  expect(vars.length).toEqual(5);
  expect(vars[0]).toEqual("kari");
  expect(vars[vars.length - 1]).toEqual("roxie");
});

//
// Arrow functions behave differently than traditional Javascript functions
// in a number of important ways. All of them good. ES6 cleans up ES5 by
// reducing the "magic" that is allowed.
//
// * Cannot be called with `new`.
// * `prototype` does not exist.
// * `this` is lexically bound. Not based on how the function was invoked.
// * Can't change the value of `this`.
//
test("es6-arrow-functions", () => {
  // IIFE (immediately invoked function expressions)
  // Note the entire IIFE must be wrapped in ().
  var person = ((name) => {
    return {
      getName() {
        return name;
      },
    };
  })("damon");
  expect(person.getName()).toEqual("damon");

  // Arrow functions are truly functions
  let f = () => {
    return 10;
  };
  expect(typeof f === "function").toBeTruthy();
  expect(f instanceof Function).toBeTruthy();

  // You can still use `call`, `apply`, and `bind` with arrow functions.
  expect(f.call(null)).toBe(10);
  expect(f.apply(undefined, [])).toBe(10);
});
