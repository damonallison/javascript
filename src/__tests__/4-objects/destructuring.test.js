"use strict";

import _ from "lodash";

//
// Object & Array Destructuring
//
// Destructuring is the process of pulling out select pieces of data from an
// object or array and assigning those values to new variables.

//
// Array and object destructuring matches patterns. The left side of the
// expression is the pattern of the object you are destructing and the variables
// you are destructing the object into.
//
// The pattern occurs before the assignment. In the following example, `obj` is
// expected to have `x` and `y` properties, which are assigned to new variables
// `var1` and `var2`.
//
// let { x: var1, y: var2 } = obj;
//

//
// Array Destructuring
//
// Array destructuring allows you to pull certain elements out of an array into
// variables. Each position in the source array must be manually accounted for
// in the destructuring pattern.
//
// For example, if you wanted to destructure out only the 4th variable, you must
// account for the first three variables manually.
//
// const arr = [10, 20, 30, 40];
// const [,,,x] = arr;
// expect(x).toBe(40);
//
test("array-destructuring", () => {

    const arr = [10, 20, 30];

    // Array destructoring
    const [a, b, c] = arr;
    expect(a).toBe(10);
    expect(b).toBe(20);
    expect(c).toBe(30);

    // Just pull the 3rd element out of the array. Elements you don't care about can be skipped over with `,`
    const [,,x] = arr;
    expect(x).toBe(30);

});

//
// The rest argument can be used to copy values from an array into a new array.
//
test("array-destructuring-using-rest-operator", () => {

    const a = [1, 2, 3];
    let [x, ...y] = a; // Destructures the remaining values of `a` into `y`.

    expect(x).toBe(1);
    expect(_.isEqual([2, 3], y)).toBeTruthy();

});

//
// Object Destructuring
//
// Like array destructuring, object destructuring allows you to pull variables
// out of objects.
//
// The left hand side of the expression is the pattern of the object you are
// destructuring. The right hand side of the expression is the object you are
// destructuring from.
//
test("simple-object-destructuring", () => {

    const obj = {
        name: "damon",
        kids: [
            {
                name: "grace",
                age: 14
            },
            {
                name: "lily",
                age: 14
            },
            {
                name: "cole",
                age: 11
            }
        ],
        address: {
            city: "maple grove",
            location: {
                lat: 44.9778,
                lon: -93.258
            }
        }
    };

    // Destructure out the entire kids array into a variable of the same name (kids).
    // This is a convenience for explicitly declaring a local variable with the same name (kids: kids).
    const { kids } = obj;
    expect(kids.length).toBe(3);
    expect(kids[0].name).toBe("grace");

    // Destructure out only certain kids (using a combination of array and object destructuring).
    const {
        kids: [
            first,
            ,
            third
        ]
    } = obj;
    expect(first.name).toBe("grace");
    expect(third.name).toBe("cole");

    // Destructure out just the first object's name.
    const {
        kids: [
            {
                name: g2
            }
         ]
    }  = obj;
    expect(g2).toBe("grace");

    // How to destructure out the third object's name.
    const {
        kids: [
            ,
            ,
            {
                name: coleName
            }
        ]
    } = obj;
    expect(coleName).toBe("cole");

    // Destructing a value deep in the hierarchy.
    const {
        address: {
            location: {
                lat
            }
        }
    } = obj;
    expect(lat).toBe(44.9778);
});


test("object-destructuring-copy-to-new-object", () => {

    const obj = {
        x: 10,
        y: 20,
        z: 30
    };

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
// Destructuring unknown values.
//
// If values do not exist in the object being destructured, you can use default
// values. If values do not exist, and you don't use default values, the
// variables are `undefined`.
//
test("object-destructuring-default-values", () => {

    const obj = {
        firstName: "damon"
    };

    const {
        firstName: first,
        middleName: middle,
        lastName: last = "default lastname"
    } = obj;

    expect(first).toBe("damon");
    expect(middle).toBeUndefined();
    expect(last).toBe("default lastname");

});
//
// Descructured parameters allow you to pass function arguments using an object.
// This makes the function definition more explicit and automatically unwraps
// (err, destructs) the objects into variables for you. Less code, less room for error.
//
test("destructured-parameters", () => {

    let process = (url, { secure, expires }) => {
        expect(url).toBe("http://google.com");
        expect(secure).toBe(true);
        expect(expires).toBe(10);
    }

    process("http://google.com", {
        secure: true,
        expires: 10,
        someOtherVar: "test",
    });
});

//
// Object destructuring can get really crazy, really fast.
//
// The example below shows how default behavior works and
// makes you really think about how object destructuring works.
//
test("crazy-destructuring", () => {

    var x = 200, y = 300, z = 100;
    var o1 = {
        x: {
            y: 42
        },
        z: {
            y: z
        }
    };

    // o1 does not have a y property. Therefore `x` is going to assume the default value, which is { y: 300 }
    ( { y: x = { y: y } } = o1 );
    expect(_.isEqual(x, { y: 300 })).toBeTruthy();

    ( { z: y = { y: z } } = o1 );
    // o1 does have a `z` property so `y` is set to { y: 100 }
    expect(_.isEqual(y, { y: 100 })).toBeTruthy();

    // o1 does have an `z` property, so `z` is sto to { y: 42 }
    ( { x: z = { y: x } } = o1 );
    expect(_.isEqual(z, { y: 42 })).toBeTruthy();

});