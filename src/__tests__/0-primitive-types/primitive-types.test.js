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
test("undefined", () => {

    // The variable v is undefined. It is not assigned to a value.
    let v;
    expect(v).toBeUndefined()

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

    // An example of all the `typeof` values.
    let v;
    expect(typeof v).toBe("undefined");
    expect(typeof true).toBe("boolean");
    expect(typeof 42).toBe("number")
    expect(typeof "42").toBe("string");
    expect(typeof Symbol("42")).toBe("symbol");
    expect(typeof {}).toBe("object");
    expect(typeof (() => {})).toBe("function");

    // null is reported as an object (bug?)
    expect(typeof null).toBe("object");

    // Another function example.
    const f = v => `print ${v}`;
    expect(typeof f).toBe("function");
    expect(typeof f()).toBe("string")
    
});

//
// Javascript will implicitly coerce values. Be careful.
//
// Coercions can be made explicit by explicitly casting
// variables.
//
test("explicit type coersion", () => {

    const n = "42";
    const n2 = Number(n) + 1;
    expect(n2).toBe(43);

});

test("implicit type coercion", () => {

    const n = "42"
    const n2 = n + 1; // Here, 1 is implicitly coerced into a string
    expect(n2).toBe("421");

    const n3 = n * 2; // Here, n is implicity coerced into a number
    expect(n3).toBe(84);
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
    
});

//
// Javascript only performs equality checks between two values of the same type.
//
// Using value equality operators (== and !=), Javascript will coerce types as necessary to perform comparisons.
//
// ==   : checks for value equality. Type coercion occurs if necessary to perform the comparison.
// ===  : checks for value and type equality. Type coercion is not done.
//
// Type coercion rules are found in the ES spec here:
// http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
//
// When performing value equality on values with two different types (x == y) where Type(x) != Type(y):
//
// * If x is Number() and y is String(), perform x == ToNumber(y)
// * If y is Number() and x is String(), perform ToNumber(x) == y
// * If x is Boolean(), return ToNumber(x) == y
// * If y is Boolean(), return x == ToNumber(y)
//
test("equality and type coercion", () => {

    const zero = "0";

    expect(zero == 0).toBeTruthy();
    expect(zero === 0).toBeFalsy();

    expect(0 == "").toBeTruthy(); // Ouch, this sucks. JS is working off the "falsy" rules.
    expect(false == "").toBeTruthy(); // So does this.
    expect(false == []).toBeTruthy(); // And this.

    
    expect(0 === "").toBeFalsy();
    expect(false === "").toBeFalsy();
    expect(false === []).toBeFalsy();

    //
    // Object equality, whether using == or === will *always* use reference equality.
    //
    const obj  = { "name" : "damon" };
    const obj2 = { "name" : "damon" };

    expect(obj == obj2).toBeFalsy();
    expect(obj === obj2).toBeFalsy();

    //
    // Array equality is strange.
    // 
    // Arrays with equivalent values are not equal.
    // Arrays can be coerced into a comma delimited string, which is just bizarre.
    //
    const a1 = [1, 2, 3]
    const a2 = [1, 2, 3]
    const a3 = "1,2,3"
    expect(a1 == a2).toBeFalsy()
    expect(a1 == a3).toBeTruthy();

});

//
// Javascript's coercion rules for inequality are different than equality. (Shocker)
//
// If both values are strings, values are compared lexiographically.
// If one or both is *not* a string, both are coerced into numbers.
// 
test("inequality", () => {


    const n1 = 42;
    const n2 = "43";
    const n3 = "44";

    expect(n1 < n2).toBeTruthy(); // Numeric comparison
    expect(n2 < n3).toBeTruthy(); // String comparison
    expect("299" < n2).toBeTruthy() // String comparison (lexiographically - 2 < 4). This is messed up.
    expect(Number("299") > n2).toBeTruthy(); // Better

    const foo = "foo";

    //
    // NaN is neither greater than or less than any other value.
    // Here, because one operand is numeric, foo is coerced into a Number, which returns NaN.
    //
    expect(foo >= n1).toBeFalsy();
    expect(foo <= n1).toBeFalsy();
});