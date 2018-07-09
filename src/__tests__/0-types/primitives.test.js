"use strict";

//
// Javascript has the following set of built in types:
//
// * Undefined
// * Null
// * Boolean
// * Number
// * String
// * Symbol
// * Object
//
// These tests show examples of working with these primitive types.
// Objects are a bigger topic and will be described elsewhere.
//
// Javascript is a dynamically typed language. Variables do not have types in 
// Javascript, values have types. A variable is simply a container for an
// underlying value.
//
//
// "Natives"
// 
// Each primitive type has a "native" type which primitives are boxed into when 
// needed. For example, string's native is String(). String() defines the capabilities
// for strings, like `.toUpperCase()`.
//
// Native vs. Object types was one of the regrets Brendan Eich had when creating JavaScript.
// He called it "unfortunate" that they made it into the language - he would
// have rather had a single type.
// 
test("undefined", () => {

    //
    // Variables that have no value are `undefined`.
    // 
    // It's tempting to think "Oh, v is defined - I just defined it.".
    // From Javascript's perspective, if it doesn't have a *value* it's
    // considered undefined.
    //
    let v;
    expect(v).toBeUndefined()

    // Use `typeof` to determine if a variable exists.
    expect(typeof NOTTHERE).toBe("undefined");

    // The property `y` on object `x` is not defined.
    let x = {};
    expect(x.y).toBeUndefined();
    expect(x["y"]).toBeUndefined();

    // Using typeof on an undefined variable will always return "undefined"
    expect(typeof z).toEqual("undefined");

    // The function does not have a return statement, therefore
    // the return value is `undefined`
    let f = (arg) => {};
    expect(f("test")).toBeUndefined();

    // If a parameter is missing, it is undefined.
    let f2 = (arg) => `echo ${arg}`;
    expect(f2()).toBe("echo undefined");

    // Variables can be set to "undefined".
    x = undefined;
    expect(x === undefined).toBeTruthy();

});

test("null", () => {

    // Simply declaring a variable does not make it `null`.
    // Until it is assigned a value (including `null`), it is `undefined`.
    let x;
    expect(x).toBeUndefined();
    expect(x).toBeFalsy();

    x = null;
    expect(x).toBeNull();
    expect(x).toBeFalsy();

    // careful - typeof null will return "object". This is a long standing JS bug that will never be fixed.
    expect(typeof x).toEqual("object");

    x = "test"
    expect(x).not.toBeNull()
    expect(x).toBeTruthy()

});

//
// `typeof` will always return one of 7 string values.
//
// "undefined", "string", "number", "boolean" "object", "symbol", "function"
// 
test("typeof", () => {

    //
    // An example of all the `typeof` values.
    //
    let v;
    expect(typeof v).toBe("undefined");
    expect(typeof true).toBe("boolean");
    expect(typeof 42).toBe("number")
    expect(typeof "42").toBe("string");
    expect(typeof Symbol("42")).toBe("symbol");
    expect(typeof (() => {})).toBe("function");

    //
    // typeof can be used to determine if a variable exists.
    // 
    expect(typeof x).toBe("undefined");

    // Objects
    //
    expect(typeof {}).toBe("object");
    // null is reported as an object (bug?)
    expect(typeof null).toBe("object");
    // Arrays are objects
    expect(typeof([1, 2])).toBe("object");

    // Another function example.
    const f = v => `print ${v}`;
    expect(typeof f).toBe("function");
    expect(typeof f()).toBe("string")
});

//
// The specific list of "falsy" values in JavaScript:
//
// "", 0, -0, NaN, null, undefined, false
//
// 
test("truthy and falsy", () => {

    expect(NaN).toBeFalsy();
    expect(0).toBeFalsy();
    expect("").toBeFalsy();
    expect(null).toBeFalsy();
    expect(undefined).toBeFalsy();

    expect(Number.POSITIVE_INFINITY).toBeTruthy();
    expect(" ").toBeTruthy();
    expect("0").toBeTruthy();
    expect({}).toBeTruthy();
    expect(() => {}).toBeTruthy();
    
});