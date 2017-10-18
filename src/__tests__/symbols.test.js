//
// ES6 introduces symbols.
//
// Symbols are a primitive type. The original goal of symbols is to
// introduce private object members.
//
test("symbol-create", () => {

    //
    // Symbols can include a "description" (i.e., "first name")
    // You can't use the string to access the property,
    // however it's useful for debugging.
    //
    let fName = Symbol("first name");
    let person = { [fName] : "damon" };

    // You can only access the symbol property
    // where you have access to the symbol - the property is not public.
    expect(person.fName === undefined).toBeTruthy();
    expect(person[fName]).toBe("damon");

    // Symbols have .toString(), which can be used for debugging
    expect(fName.toString()).toMatch(/Symbol\(first name\)/);
    // console.log(fName); // Will print "Symbol(first name)"

});

//
// Shared symbols are stored in a global symbol registry.
//
// This allows all code to access the same symbol.
//
// Use Symbol.for() to create / access a shared symbol.
//
test("shared-symbols", () => {

    let s = Symbol.for("s");
    let o = { [s]: "test" };

    expect(o[s]).toEqual("test");

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

    let symbols = Object.getOwnPropertySymbols(o);

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