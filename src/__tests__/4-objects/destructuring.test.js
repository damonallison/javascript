"use strict";

const arraysEqual = require("array-equal");
//
// Object & Array Destructuring
//

//
// Array and object destructuring matches patterns.
//
// The pattern occurs before the assignment. In the following example, `obj` is
// expected to have `x` and `y` properties, which are assigned to new variables
// `var1` and `var2`.
//
// let { x: var1, y: var2 } = obj;
//
test("simple-object-destructuring", () => {

    const arr = [10, 20, 30];

    const obj = {
        x: 10,
        y: 20,
        z: 30
    };

    // Array destructoring
    const [a, b, c] = arr;
    expect(a).toBe(10);
    expect(b).toBe(20);
    expect(c).toBe(30);

    const { x: var1, y: var2 } = obj;
    expect(var1).toBe(10);
    expect(var2).toBe(20);

    // Use a shorthand to assign local variables to object properties of the same name.
    const { x, y } = obj;
    expect(x).toBe(10);
    expect(y).toBe(20);

    // Copy certain values to another object.
    const obj2 = {};

    // When destructuring becomes complex, use whitespace to clarify.
    ({
        x: obj2.x,
        y: obj2.y
    } = obj);

    expect(obj2.x).toBe(obj.x);
    expect(obj2.y).toBe(obj.y);
});

//
// The rest argument can be used to copy values from an array into a new array.
//
test("rest-object-destructuring", () => {

    const a = [1, 2, 3];
    let [x, ...y] = a; // Destructures the remaining values of `a` into `y`.

    expect(x).toBe(1);
    expect(arraysEqual([2, 3], y)).toBeTruthy();

});