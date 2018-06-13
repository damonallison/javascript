"use strict";

//
// Strings
//

test("string native", () => {

    const s = "test";

    expect(s.toUpperCase()).toBe("TEST");
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
    var found = "";
    for (let i = 0; i < name.length; i++) {
        // creates a new immutable string with every iteration.
        // would be more efficient as an array.
        found += name[i];
    }
    expect(found).toEqual(name);
});


