//
// ES6 introduces symbols.
//
// A symbol is an internal, guaranteed unique value.
//
// Symbols can be used in place of strings to avoid collisions. It is guaranteed
// to be unique.
//
// For example, creating a "hidden" object property which can only be accessed
// by using the symbol.
//
test("symbol-create", () => {

    //
    // Symbols can include a "description" (i.e., "first name") You can't use
    // the string to access the property, however it's useful for debugging.
    //
    let fName = Symbol("first name");

    //
    // Even when symbols have the same string name, they are distinct.
    //
    let fName2 = Symbol("first name");

    let person = { [fName] : "damon" };

    //
    // You can only access the symbol property where you have access to the
    // symbol - the property is not public.
    //
    expect(person[fName]).toBe("damon");
    expect(person.fName === undefined).toBeTruthy(); // `.` notation will not work.

    //
    // Each symbol is unique. Even if another symbol has the same name,
    // they are still unique.
    //
    expect(person[fName2]).toBeUndefined();

    //
    // Use typeof(val) == "symbol" to determine if a variable is a symbol.
    // instanceof does not work (WHY?)
    //
    expect(fName instanceof Symbol).toBeFalsy(); // WTF?
    expect(typeof(fName)).toBe("symbol");        // typeof(fName) === "symbol"


    //
    // Symbols have .toString(), which can be used for debugging.
    // The string representation is *not* a way to identify a symbol.
    //
    expect(fName.toString()).toMatch(/Symbol\(first name\)/);

});

//
// Shared symbols are stored in a global symbol registry.
//
// The global symbol registry stores singleton Symbol instances which can be
// referenced by a string. This gives all code access to symbols.
//
// Use Symbol.for() to create / access a shared symbol.
//
// ** Important **
//
// The symbol registry is just another way to store global state. Global state
// is evil. Don't do this.
//
test("shared-symbols", () => {

    let s = Symbol.for("s");
    let o = { [s]: "test" };

    expect(o[s]).toEqual("test");

    //
    // If you need the symbol key to pass to another part of code.
    //
    // You have now come full circle. Created a symbol using a key, and
    // retrieving the key from the symbol.
//
    expect(Symbol.keyFor(s)).toBe("s");

});

//
// Symbol properties on an object do *not* get added to the
// `Object.keys() or `Object.getOwnPropertyNames()` methods
// (since they are meant to be hidden).
//
// Use `Object.getOwnPropertySymbols()` to retrieve property
// symbols.
//
test("reflecting-symbol-properties", () => {

    let s = Symbol();
    let o = { [s]: "test" };

    expect(Object.getOwnPropertyNames(o).length).toBe(0);
    expect(Object.keys(o).length).toBe(0);

    //
    const symbols = Object.getOwnPropertySymbols(o);

    expect(symbols.length).toBe(1);
    expect(symbols[0]).toBe(s);
    expect(o[symbols[0]]).toBe("test");

});


//
// ES6 has predefined symbols which objects can implement to perform
// custom language level operations (like search, regex, iterator)
//
// In Java terms, implementing these symbols is similar to implementing
// low level interfaces for enumeration, regex matching, or array like
// operations. They allow your object to have a custom implementation for
// common "language" like things.
//
test("well-known-symbols", () => {

    // Example : implementing a custom .toString() function.
    //
    // JS will call Symbol.toStringTag to produce an object's string value.

    function Person(name) {
        this.name = name;
    }
    Person.prototype[Symbol.toStringTag] = "Person";
    let me = new Person("damon");
    expect(Object.prototype.toString.call(me)).toEqual("[object Person]");

});