
//
// Before ES6, all vars were function or globally scoped.
//
// ES6 introduces lexically scoped vars in the form of `let` and `const` vars.
//
// `const` : read only, block based. Only the reference is immutable, the contents
//           of an object pointed to by a const can change.
// `let`   : block based. Use instead of `var`.
//
// Use `const` by default for immutability, let otherwise.
//
test("block bindings", () => {
    const x = 10;

    // With consts, only the reference is fixed.
    // The contents of the reference can change.
    const obj = { name : "damon" };
    obj.name = "cole";

    let funcs = [];
    for (let i = 0; i < 10; i++) {
        // a new value for `i` is created at every iteration.
        // allowing us to capture the current value in a function
        funcs.push(() => { return i }); // i is captured as 0, 1, 2, 3...
    }

    for (let i = 0; i < funcs.length; i++) {
        expect(funcs[i]()).toEqual(i);
    }
    // with for-in and for-of
    for (const key in obj) {
        expect(key).toEqual("name");
        // key scoped here
    }

});