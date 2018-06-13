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

    expect(x).toBeNaN()
    expect(isNaN(x)).toBeTruthy()
    expect(isNaN("damon")).toBeTruthy()
  
    // Watch out! NaN is not equal to itself. **Use isNaN**
    expect(NaN == NaN).toBeFalsy()
    expect(NaN === NaN).toBeFalsy()
    expect(x === NaN).toBeFalsy() 

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

    // Any number multiplied by infinity will equal infinity.
    expect(.5 * i).toBe(Number.POSITIVE_INFINITY)

    // Watch out for 0, which is a special case.
    expect(0 * i).toBeNaN()
    
    // Any number divided by infinity will be 0.
    expect(0 / i).toBe(0)

});

test('number parsing', () => {    

    // ES has built in functions to parse int / float values.
    expect(parseInt("20")).toBe(20)
    expect(parseFloat("20.0000")).toBe(20)

    // Explicitly casting using Number()
    const n = Number("20");
    expect(n).toBe(20);
    expect(n).toBe(20.00);

    expect(n.toString()).toBe("20"); // number -> string

    const n2 = Number("20.0");
    expect(n2).toEqual(n);

    const n3 = Number("test")
    expect(n3).toBeNaN()
    
});

//
// ES5's number type 
// 
test("number native", () => {
    let n = Number(100.00)

    // toString
    expect(n.toString() === "100")

    // toFixed
    expect(n.toFixed(3).toString()).toBe("100.000")

    // toExponential
    let n2 = Number(100.1)
    expect(n2.toExponential().toString()).toBe("1.001e+2")

});

