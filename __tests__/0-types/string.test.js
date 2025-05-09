import { expect, test } from "vitest";
//
// Strings
//

//
// JS strings are immutable. They are "array-like" in that you can
// access characters by ordinal, but they are *not* arrays.
//
test('strings are "array like"', () => {
  const s = "test";

  // Array-like properties.
  expect(s.length).toBe(4); // length
  expect(s[0]).toBe("t"); // ordinal access

  // String properties
  expect(s.toUpperCase()).toBe("TEST");
  expect(s.toLowerCase()).toBe("test");

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

  expect(native).toEqual(obj.toString());
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

//
// ES6 string template literals : backticks.
//
// * Multi-line strings using \. Tabs count on newlines, so watch indentations.
// * Expressions can be embedded into templates using ${}.
//
test("string templates", () => {
  const name = "damon";
  const s10 = `
I said:
    "hello, ${name}. We can embed expressions. The time is: ${new Date().toString()}!"`;
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
    return result;
  }

  //
  // The same function, much more compact, using reduce.
  //
  // Understand that length(strings) === length(values) + 1
  //
  function echoReduce(strings, ...values) {
    // console.log(`Strings len=${strings.length} Values len=${values.length}`);
    // console.log(strings);
    // console.log(values);
    return strings.reduce((fullStr, value, idx) => {
      return `${fullStr}${idx > 0 ? values[idx - 1] : ""}${value}`;
    });
  }
  let count = 10,
    price = 0.25;

  let message = echoTag`${count} items cost $${(count * price).toFixed(2)}`;
  expect(message).toEqual("10 items cost $2.50");
  expect(echoReduce`${count} items cost $${(count * price).toFixed(2)}`).toBe(
    "10 items cost $2.50"
  );
});

test("string iterating", () => {
  const name = "damon";
  let found = "";

  for (let i = 0; i < name.length; i++) {
    // creates a new immutable string with every iteration.
    // would be more efficient as an array.
    found += name[i];
  }
  expect(found).toBe(name);

  found = "";

  // String is an iterable.
  for (let i of name) {
    found += i;
  }
  expect(found).toBe(name);
});

//
// ES6 altered the way to represent unicode characters outside the BMP (0x0000 to 0xFFFF).
// Prior to ES6, you needed to specify unicode characters outide the BMP using a surroage pair.
//
// Pre-ES6
// var gclef = "\uD834\uDD1E";
//
// ES6
// const gclef = "\u{1D11E}";
//
test("unicode", () => {
  var gclefES5 = "\uD834\uDD1E";
  var gclefES6 = "\u{1D11E}";
  expect(gclefES5).toBe(gclefES6);
});

//
// JS regular expressions are instances of `RegExp`.
//
// Regexes can be created in two ways:
//
// 1. A regular expression literal
//
// ```
//   const re = /pattern/flags
// ```
//
// Regular expression literals are compiled when the script is loaded.
//
// 2. Instances of RegExp.
//
// ```
//   const re = new RegExp("pattern", "flags");
// ```
//
// RegExp instances are compiled at runtime. Use the constructor function when
// you know the regex pattern will be changing, or you are getting it from
// another source - like user input.
//
// `exec` returns an array containing match results or `null` if a match was not found.
// `test` is a simple test, returning a boolean if there is at least one match.
//
test("regular-expressions", () => {
  const str = "this is a test, test";

  //
  // The `string` object contains regex methods.
  //
  // `string.match` : returns the match information, or null. Similar to Regexp.exec()
  // `string.search`: returns the index of a match, or null. Similar to Regexp.test()
  //
  const m = str.match(/t(e).t/); // To show match captures, we'll capture 'e'
  expect(m[0]).toBe("test"); // [0] is always the entire pattern match.
  expect(m[1]).toBe("e"); // [1]+ will be the match captures.
  expect(m.index).toBe(10); // The position of the match
  expect(m.input).toBe("this is a test, test"); // If we want to retrieve the string source used in the match.

  //
  // Using the Regexp object
  //
  const re = /(te.t)/gim;

  //
  // Print the flags used. The ES6 spec calls for flags to be in this order
  // "gimuy" regardless of the order they were defined.
  //
  expect(re.flags).toBe("gim");
  expect(re.source).toBe("(te.t)");
  expect(re.global).toBeTruthy();
  expect(re.ignoreCase).toBeTruthy();
  expect(re.multiline).toBeTruthy();

  const match = re.exec(str);
  expect(match.index).toBe(10);

  // Test failing patterns
  const failPattern = /notthere/;
  expect(failPattern.test(str)).toBeFalsy();
  expect(failPattern.exec(str)).toBeNull();
});
