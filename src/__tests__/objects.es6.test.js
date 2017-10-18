"use strict";
//
// ES6 improves object creation.
//
// * Property initializer shorthand allows you to create objects more concisely.
//


//
// If the name of a property is the value of a variable, you
// can omit the value when creating a property.
//
// Concise method syntax allows you to omit the name and `function`
// keyword when creating a method.
//
test("property-initializer-shorthand", () => {
    const name = "damon";
    const age = 41;

    const person = {
        // Concise property syntax. `name : name` can be replaced with `name`.
        name,
        age,
        // Concise method syntax. `description : function()` can be replaced with `description()`
        description() {
            return `${this.name} ${this.age}`
        }
    };
    expect(person.name).toEqual("damon");
    expect(person.description()).toEqual("damon 41");
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

})

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


//
// Object and array destructuring
//

//
// ES6 introduces object descructuring to pull out relevant pieces from an object.
//
test("object-destructuring", () => {
    let person = {
        firstName : "damon",
        age: 41,
        children: ["grace", "lily", "cole"],
        birth: {
            hospital: "south memorial",
            date: {
                month : 8,
                day : 22
            }
        }
    };

    let { firstName, age } = person;

    expect(firstName).toBe("damon");

    // You can also use object descructuring to assign values.
    firstName = "kari";
    age = 40;
    ({firstName, age} = person);
    expect(firstName).toBe("damon");
    expect(age).toBe(41);

    // If a variable is undefined, you'll get `undefined` or a default value (if specified)
    let { children, lastName = "default" } = person;
    expect(children).toEqual(["grace", "lily", "cole"]);
    expect(lastName).toBe("default");

    // You can specify different names.
    // Here, you are defining fName and lName, binding them to `fistName` and `lastName`
    // on person.
    let { firstName : fName, lastName : lName = "default" } = person;
    expect(fName).toBe("damon");
    expect(lName).toBe("default");

    // Extracting nested members. This extracts "birthMonth" from person.birth.date.month.
    let { birth: { date: { month : birthMonth}}} = person;
    expect(birthMonth).toBe(8);
    expect(person.birth.date.month).toBe(8); // Identical (and more straight forward!)

});

//
// Array descructuring allows you to pull out array values into vars.
//
test("array-destructuring", () => {
    let colors = ["red", "green", "blue"];
    let [r, g, b] = colors;
    expect(r).toBe("red");

    // Wow, is this shitty syntax.
    let [ , , blue] = colors;
    expect(blue).toBe("blue");
});

test("mixed-destructuring", () => {
    let person = {
        firstName : "damon",
        age: 41,
        children: ["grace", "lily", "cole"],
        birth: {
            hospital: "south memorial",
            date: {
                month : 8,
                day : 22
            }
        }
    };

    // Extract firstBorn, thirdBorn from the `children` array,
    // Along with `birthMonth` from birth.date.month.
    let {
        children: [firstBorn, , thirdBorn],
        birth: { date : { month : birthMonth } }
    } = person

    expect(firstBorn).toBe("grace");
    expect(thirdBorn).toBe("cole");
    expect(birthMonth).toBe(8);

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
        expires: 10
    });
});