"use strict";

//
// Strings
//


//
// JS strings are immutable. They are "array-like" in that you can 
// access characters by ordinal, but they are *not* arrays.
//
test("strings are \"array like\"", () => {

    const s = "test";

    // Array-like properties.
    expect(s.length).toBe(4); // length
    expect(s[0]).toBe("t");   // ordinal access

    // String properties
    expect(s.toUpperCase()).toBe("TEST");

    //
    // Strings in JS are immutable. In order to operate on strings
    // as arrays (ability to move characters, convert the string to
    // an array. Split("")ting an array and join("") to get the string
    // representation back is actually a very common operation.
    //
    // Example: Reverse a string. 
    //
    // Split the string into an array, reverse the array, and rejoin. 
    //
    // **WARNING: This will **NOT** work for unicode characters.
    // Find an npm package to do this operation. (esrever)
    //
    let s2 = s.split("").reverse().join("");
    expect(s2).toBe("tset");

});

//
// Primitive `string` vs Object `String`.
//
// One of the biggest mistakes in the initial implementation of JS was making
// the "native" and "object" versions of a type (like Java).
//
// 
test("native string vs object String", () => {

    const native = "test";
    const obj = new String("test");

    //
    // Strings are immutable. 
    //
    // To mutate individual characters, you'll have to convert
    // the string to an array.
    //
    // let a = obj.split("");
    //
    obj.replace(/e/, "E");
    expect(obj.charAt(1)).toBe("e");
    expect(obj.charAt(100)).toBe(""); // uh!
    
    expect(native).toEqual(obj);
    expect(native).not.toBe(obj);

    expect(typeof native).toBe("string");
    expect(typeof obj).toBe("object");

    expect(native instanceof String).toBeFalsy();
    expect(obj instanceof String).toBeTruthy();

    //
    // Natives will be boxed on the fly. 
    //
    // Here, "trim " is a native which is boxed to `String` for a call to `trim`.
    //
    expect("test ".trim()).toBe("test");
    expect("test".length).toBe(4);

});

//
// * Strings in ES6 are unicode.
// * ES6 adds convenience functions for working with strings (contains, startsWith, endsWith).
// * String template literals provide string interpolation and allow for embedded expressions.
//
test("unicode strings", () => {
    //
    // Unicode
    //
    const text = "𠮷";
    expect(text.length).toBe(2); // There are two code units.
    expect(/^.$/u.test(text)).toBeTruthy(); // But it is only treated as one character.

    //
    // When comparing strings w/ the potential for Unicode code points,
    // always normalize the strings. This ensures that two character strings
    // which are equivalent in meaning but not the same code points
    // are treated as equal.
    //
    const s1 = "damon";
    const s2 = "damon";
    expect(s1.normalize()).toEqual(s2.normalize());
});

test("string templates", () => {

    //
    // ES6 string template literals : backticks.
    //
    // * Multi-line strings using \. Tabs count on newlines, so watch indentations.
    // * Expressions can be embedded into templates using ${}.
    //
    const name = "damon";
    const s10 = `
I said:
    "hello, ${name}. We can embed expressions. The time is: ${new Date().toString()}!"`
    // console.log(s10);
    expect(s10.indexOf(name) > 0).toBeTruthy();

    //
    // Tagged templates.
    // Allows you to apply transformations on a template.
    // literals is an array of literal strings as intrepreted by JS.
    // Each subsequent argument is the interpreted value of each substitution.
    //
    // This allows you to create domain specific languages for translating strings.
    //
    function echoTag(literals, ...substitutions) {
        let result = "";
        for (let i = 0; i < substitutions.length; i++) {
            result += literals[i];
            result += substitutions[i];
        }
        // add the last literal.
        result += literals[literals.length - 1];
        return result
    }

    let count = 10,
        price = 0.25,
        message = echoTag`${count} items cost $${(count * price).toFixed(2)}.`;

    expect(message).toEqual("10 items cost $2.50.");


});

test('string iterating', () => {
    const name = "damon";
    let found = "";
    for (let i = 0; i < name.length; i++) {
        // creates a new immutable string with every iteration.
        // would be more efficient as an array.
        found += name[i];
    }
    expect(found).toBe(name);
});


