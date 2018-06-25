"use strict";

//
// Objects in JS are based on prototypal inheritance. The tests in 
// this file show how to create an "object" and update prototype 
// links to simulate inheritance. 
//
// Prototypal inheritance differs from classical OO inheritance in an 
// important way. In classical inheritance, an entire object is created
// from the class hierarchy. In this respect, you can (via metaprogramming)
// alter one class without altering another.
//
// In Javascript, prototypes are linked to each other. Updating a prototype
// impacts all objects which include that object in it's prototype chain.
//

//
// Objects in ES5:
// * Each object has a prototype chain.
//
// var obj = {a : 1}
//
// Prototype chain:
// obj -> Object.prototype -> null
//
// Each *function* has a different prototype chain.
//
// function f { console.log("js prototypes. uh.")}
//
// Prototype chain:
// f -> Function.prototype -> null
//
// Rules:
//
// * Don't add custom functions to base types. It clutters up built-in types,
//   and potentially steps on other libraries doing the same thing.
//
// NOTE : Hopefully ES6 (2015) saves us from this shit pile that is prototypal
//        inheritance.
//

//
// 
// 
test("object basics", () => {

    // Javascript objects are key/value pairs (associative arrays).
    // Here is an object literal.
    var p = {
        firstName: "damon",
        lastName: "allison",
        age: 41,
        fullName: function () {
            return `${this.firstName} ${this.lastName}`
        },
    };

    expect(p instanceof Object).toBeTruthy();
    expect(Object.getOwnPropertyNames(p).indexOf("fullName") >= -1).toBeTruthy();

    expect(p.fullName()).toEqual("damon allison");

    //
    // Objects are fluid - they can be updated at any time.
    //
    // In general, it's probably not wise to be adding / updating functions 
    // dynamically during runtime.
    //

    p.fullName = function() {
        return `Mr. ${this.firstName.toUpperCase()} ${this.lastName.toUpperCase()}`
    };
    expect(p.fullName()).toEqual("Mr. DAMON ALLISON")

    p.firstName = "cole"
    expect(p.fullName()).toEqual("Mr. COLE ALLISON")

});

//
// This is an example of a "constructor function".
// Create a new instance of the Person "class":
// const p = new Person("damon");
//
// Note that calling this function without `new` will *not*
// create a new object and `this` object pointer. Always use
// `new`!
function Person(name) {
    this.name = name;
    this.created = Date();

    //
    // Note that a new copy of this function will be created for every
    // object instance. Attach this object to the person Prototype
    // chain to reuse the same function across all instances.
    //
    this.debugInfo = () => {
        return `${this.name} ${this.created}`
    }
}

//
// Example of adding a function directly to a prototype.
// This prevents a copy of the function to be created for every Person
// instance. 
//
Person.prototype.createAJoke = function() {
    return `Oh ${this.name}... You're as silly as prototypal inheritance.`;
};

//
// Here is a "derived" class - we simply call the "parent" constructor
// by passing in a `this` pointer and desired arguments.
//
function Teacher(name, subject) {
    Person.call(this, name);
    this.subject = subject;
};

//
// Simply calling into the "parent" class above does not establish the
// "inheritance" (delegation) chain we want. In order for an object to inherit another,
// you must establish the relationship at the prototype level.
// 
// You need the `Object.create` in order to create a new prototype object
// which links to Person.prototype. This allows you to add additional functions
// onto Teacher's prototype.
//
// If you did this:
//
// Teacher.prototype = Person.prototype
//
// Then everything you add to Teacher.prototype also gets added to Person.prototype,
// which is not what you want.
//
Teacher.prototype = Object.create(Person.prototype);

Teacher.prototype.createAJoke = function() {
    return `Teacher, ${this.name}... Teach a real language.`;
};

//
// This test shows how to create objects using the "new" syntax.
//
test("constructors", () => {

    let p = new Person("damon");
    expect(p.name).toEqual("damon");
    expect(p.created).toBeDefined();
    expect(p.debugInfo).toBeDefined();
    expect(p.createAJoke()).toContain(p.name);

    // There are two ways to get an object's prototype.
    // Object.getPrototypeOf() feels much less hacky.
    //
    // `__proto__` was officially adopted in ES6.
    expect(Object.getPrototypeOf(p)).toBe(Person.prototype);
    expect(p.__proto__).toBe(Person.prototype);

    //
    // To determine if a property is a member of the top level object
    // and *not* defined further up the prototype chain...
    //
    expect(p.hasOwnProperty("debugInfo")).toBeTruthy();

    // 
    // Because createAJoke was attached to Person's prototype,
    // it does have have it's "own" property.
    //
    expect(p.hasOwnProperty("createAJoke")).toBeFalsy();

    //
    // When iterating over an object, any property that can be reached from it's prototype
    // chain is considered part of the object's enumeration.
    //
    let props = [];
    for(let x in p) {
        props.push(x);
    }
    expect(props.includes("debugInfo")).toBeTruthy();
    expect(props.includes("createAJoke")).toBeTruthy();

    // Note that "constructor" is non-enumerable.
    expect(props.includes("constructuor")).toBeFalsy();
});

test("inheritance", () => {

    const t = new Teacher("damon", "csci");

    expect(t.name).toEqual("damon");
    expect(t.subject).toEqual("csci");
    expect(t.debugInfo).toBeDefined();
    expect(t.createAJoke()).toContain("Teacher"); // should have been overridden

    expect(t instanceof Teacher).toBeTruthy();
    expect(t instanceof Person).toBeTruthy();
    expect(t instanceof Object).toBeTruthy();

    //
    // instanceof is using `prototype` to determine if an instance
    // contains a given prototype.
    //
    expect(Teacher.prototype.isPrototypeOf(t)).toBeTruthy();
    expect(Person.prototype.isPrototypeOf(t)).toBeTruthy();
    expect(Object.prototype.isPrototypeOf(t)).toBeTruthy();

    let p = new Person("damon");
    
    expect(p instanceof Teacher).toBeFalsy(); // nope
    expect(p instanceof Person).toBeTruthy();
    expect(p instanceof Object).toBeTruthy();

    //
    // Use `getOwnPropertyNames` to examine an object's prototype.
    //
    expect(Object.getOwnPropertyNames(Person.prototype).indexOf("createAJoke") >= 0).toBeTruthy();
    expect(Object.getOwnPropertyNames(Teacher.prototype).indexOf("createAJoke") >= 0).toBeTruthy();
});


//
// Javascript and prototypal inheritance is inherently "delegation based".
// If an object does not contain a member, the prototype chain is consulted.
//
// When working with JS, think in terms of "delegation", not "inheritance".
//
test("behavior-delegation", () => {
    const x = {};
});