"use strict";

//
// Number
//
// Javascript has a single `number` type - a 64 bit float (double in java)
//

//
// NaN == Not a Number
//
// ES provides a function `isNaN` to test if a value is not a number.
// Do *not* use equality comparisons to `NaN`. `NaN != NaN` in JS.
//
test("NaN", () => {

    let x = NaN

    //
    // Number.isNaN is a more correct form of checking for NaN. It will
    // *not* accept non-numeric values.
    //
    // Number.isNaN requires a number argument. Therefore, explicitly
    // cast the argument to Number().
    //
    expect(Number.isNaN(NaN)).toBeTruthy();
    expect(Number.isNaN(x)).toBeTruthy()
    expect(Number.isNaN(Number("damon"))).toBeTruthy()
    expect(Number.isNaN(Number(undefined))).toBeTruthy();

    //
    // You can also use JS's builtin function isNaN to check for NaN.
    // Any non-numeric value will return true.
    //
    expect(isNaN(NaN)).toBeTruthy();
    expect(isNaN(x)).toBeTruthy();
    expect(isNaN("damon")).toBeTruthy()
    expect(isNaN(undefined)).toBeTruthy();



    //
    // Watch out! NaN is not equal to itself. **Use isNaN**
    //
    expect(NaN == NaN).toBeFalsy()
    expect(NaN === NaN).toBeFalsy()
    expect(x === NaN).toBeFalsy()

    //
    // Any mathematic operation you perform without both operands being `number`
    // will result in NaN
    //
    expect(1 / "test").toBeNaN();

    //
    // This is awesome. The type of NaN is... "number"
    //
    expect(typeof NaN).toBe("number");
});

//
// Infinity is greater than any other value.
//
test("Infinity", () => {

    const i = Infinity

    expect(i).toBe(Number.POSITIVE_INFINITY)
    expect(-i).toBe(Number.NEGATIVE_INFINITY)

    expect(Number.MAX_VALUE < Number.POSITIVE_INFINITY).toBeTruthy()
    expect(Number.MIN_VALUE > Number.NEGATIVE_INFINITY).toBeTruthy()

    // Anything divided by 0 will be infinity.
    expect(1 / 0).toBe(Number.POSITIVE_INFINITY);
    expect(-1 / 0).toBe(Number.NEGATIVE_INFINITY);

    // Any number multiplied by infinity will equal infinity.
    expect(.5 * i).toBe(Number.POSITIVE_INFINITY)

    // Watch out for 0, which is a special case.
    expect(0 * i).toBeNaN()

    // Any number divided by infinity will be 0.
    expect(0 / i).toBe(0)

});

test('number parsing', () => {

    //
    // Testing for integer values.
    //
    expect(Number.isInteger(42)).toBeTruthy();
    expect(Number.isInteger("42")).toBeFalsy();
    expect(Number.isInteger(42.0)).toBeTruthy();
    expect(Number.isInteger(42.1)).toBeFalsy();

    //
    // If you are dealing with large numbers, use isSafeInteger()
    //
    expect(Number.isSafeInteger(42)).toBeTruthy();

    //
    // ES has built in functions to parse int / float values.
    //
    expect(parseInt("20")).toBe(20)
    expect(parseFloat("20.0000")).toBe(20)

    //
    // Be careful! parseInt / parseFloat are tolerant of non-numeric characters.
    // parsing will stop when a non-numeric character is reached.
    //
    // If you do *not* want to tolerate non-numeric characters (which I would
    // highly encourage), than do not use parseInt() or parseFloat(). Use
    // a numeric type conversion instead (e.g., Number(val))
    //
    expect(parseInt("100test")).toBe(100);
    expect(parseFloat("20.ATest")).toBe(20);

    //
    // Explicit coercion using Number()
    //
    const n = Number("20");
    expect(n).toBe(20);
    expect(n).toBe(20.00); // Again, 20 and 20.0 are exactly the same - only 1 number type!

    expect(n.toString()).toBe("20"); // number -> string

    const n2 = Number("20.0"); // string -> number
    expect(n2).toEqual(n);

    const n3 = Number("test")

    expect(Number.isNaN(n3)).toBeTruthy();



});


//
// Javascript support exponential notation.
//
test("number exponents", () => {

    let n = 1e+2;
    expect(n).toBe(100);
    expect(n.toString()).toBe("100");

    let n2 = 1e-2;
    expect(n2).toBe(0.01);

});

//
// ES5's number primitive type can be boxed to Number.
//
// Therefore, anything available on Number.prototype is automatically
// available from number instances.
//
test("number boxing", () => {

    const n = 100

    //
    // toString()
    //
    expect(n.toString()).toBe("100");

    // toExponential() by default will include the minimum number
    // of decimals to represent the entire number.
    let n2 = 100.1
    expect(n2.toExponential().toString()).toBe("1.001e+2")
    expect(n2.toExponential(0)).toBe("1e+2");
    expect(n2.toExponential(1)).toBe("1.0e+2");

    //
    // toFixed()
    //
    // Specifies the number of fractional decimal places to be printed.
    //
    // You *could* use toFixed() to print out currencies, but you'd
    // probably want to look into internationalization libraries.
    //
    expect(n2.toFixed(0)).toBe("100");
    expect(n2.toFixed(1)).toBe("100.1");
    expect(n2.toFixed(2)).toBe("100.10");


    //
    // toPrecision()
    //
    // toPrecision() is similar to toFixed(), but rather than specifying the number
    // of *decimal places*, toPrecision() specifies the number of significiant digits.
    //
    expect(n2.toPrecision(1)).toBe("1e+2")
    expect(n2.toPrecision(3)).toBe("100");
    expect(n2.toPrecision(4)).toBe("100.1");
    expect(n2.toPrecision(5)).toBe("100.10");
});

//
// Javscript has a single floating point number type.
//
// The most common way to compare floating point values is to use
// an acceptable "rounding error".
//
test("number comparisons", () => {

    function areLogicallyEqual(n1, n2) {
        return Math.abs(n1 - n2) < Number.EPSILON
    }

    let num1 = 0.1;
    let num2 = 0.2;

    expect(num1 + num2).not.toBe("0.3");
    expect(areLogicallyEqual(num1 + num2, 0.3)).toBeTruthy();

    //
    // Jest has floating point friendly matchers.
    //
    expect(num1 + num2).toBeCloseTo(0.3);

    //
    // Javascript has +0 and -0 to distinguish between how the number arrived at 0.
    //
    // For example, if the direction of movement was negative, the value -0 could
    // be used. If the direction of movement was positive, the value 0 could be used.
    //
    expect(-0 === +0).toBeTruthy();
});

//
// Because of how numbers are represented in JS, there is a range of "safe"
// values for whole number integers, and it's significiantly less than Number.MAX_VALUE.
//
// A "safe" value is guaranteed that the requested value is actually representable
// unambiguously.
//
// The naximum integer that can be safely represented is 9,007,199,254,740,991.
//
// The main way that JS programs are confronted with such large numbers is when
// dealing with 64-bit IDs from databases. 64-bit numbers cannot be represented
// accurately with `number`, so must be stored and transmitted to/from Javascript using
// `string`.
//
// If you need to perform mathematical operations on large number objects, you'll
// need to find a 3rd party "big number" utility.
//
test("large numbers", () => {

        expect(Number.isSafeInteger(100)).toBeTruthy();

});