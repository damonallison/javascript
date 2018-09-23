"use strict";

import _ from "lodash";

//
// ES6 improves object creation.
//
// * ES2015 introduces classes and extensions to bring more traditional OO capabilities to JS.
// * Property initializer shorthand allows you to concisely define objects.
// * Computed property names allow you to use variable values as property names.
// * Object destructing allows you to pull only relevant parts out of an object.
//
// The new ES2015 OO related keywords are:
// * class, constructor, static, extends, and super.
//
//
// Concise property syntax.
//
// If the name of a property is the value of a variable, you
// can omit the value when creating a property.
//
// Concise method syntax.
//
// Concise method syntax allows you to omit the name and `function`
// keyword when creating a method.
//
test("property-initializer-shorthand", () => {
    const name = "damon";
    const age = 41;

    const person = {
        //
        // Concise property syntax.
        // * `name : name` can be replaced with just `name`.
        //
        name,
        age,
        //
        // Concise method syntax.
        // * `description : function()` can be replaced with just `description()`
        //
        description() {
            return this === undefined ? undefined : `${this.name} ${this.age}`
        },
        echo(val) {
            return val;
        }
    };
    expect(person.name).toEqual("damon");
    expect(person.description()).toEqual("damon 41");

    // Concise methods still follow `this` semantics.
    const f = person.description;
    expect(f()).toBeUndefined();

    // Concise methods can still be used for event handlers, as long as they don't
    // depend on `this`.
    const f2 = person.echo;
    expect(f2("test")).toBe("test");
});

//
// Computed properties
//
// Using [] allows you to use variables as property names.
//
test("computed-property-names", () => {

    var nameField = "firstName";

    var person = {
        [nameField] : "damon",
    };

    expect(person.firstName).toEqual("damon");

});

//
// Object.is() determines if two objects are truly equal.
// It cleans up the nuances with the built in `===` operator.
//
// The `===` operator treats NaN and +0 / -0 differently.
//
// Always use Object.is() over `===` when checking for object equality.
//
test("object-equality", () => {

    // This is a problem with `===`. This should be `true`!
    expect(NaN === NaN).toBeFalsy();

    // Object.is a much better way to check for object equality.
    expect(Object.is(NaN, NaN)).toBeTruthy();
    expect(Object.is(undefined, undefined)).toBeTruthy();
    expect(Object.is(typeof Function, typeof (() => {}))).toEqual(true);

    // Object.is avoids type cohesion.
    expect(Object.is(5, "5")).toBeFalsy();

    // Note that object equality does *not* do value equality, only reference equality.
    const a = { x: 100 };
    const b = { x: 100 };
    expect(a === b).toBeFalsy();

    // In order to perform value equality, use lodash.
    expect(_.isEqual(a, b)).toBeTruthy();


});

//
// ES6 introduces "super" as a way to invoke an object's prototype.
//
test("using-super", () => {

    let person = {
        getGreeting() {
            return "Hello";
        }
    };

    let friend = {
        getGreeting() {
            // Prior to ES6, this is how you accessed the prototype.
            // Object.getPrototypeOf(this).getGreeting.call(this)
            return super.getGreeting() + ", hi!"
        }
    };

    // Here is what establishes the "object" hierarchy, allowing
    // `friend` to have a prototye containing getGreeting().
    Object.setPrototypeOf(friend, person);

    let relative = Object.create(friend);
    expect(relative.getGreeting()).toEqual("Hello, hi!");
});

//
// ES6 provides a `new.target` metaproperty. This allows you to better enforce that a function was called
// using `new`. This is valuable for constructor functions.
//
function Person(name, age) {
    if (typeof new.target === "undefined") {
        throw new Error("Constructor functions must be called with new");
    }
    // We are being called with `new`. `this` points to the current object.
    this.name = name;
    this.age = age;
}
test("new-target", () => {
    try {
        const p = Person("damon", 41);
        expect(1 == 2).toBeTruthy(); // Fail the test.
    }
    catch(e) {
        expect(e instanceof Error).toBeTruthy();
    }

    const p = new Person("cole", 10);
    expect(p.name).toBe("cole");
    expect(p.age).toBe(10);
});