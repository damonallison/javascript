//
// Objects in JS are based on prototypal inheritance.
// Proponents of JS think this is more powerful than traditional OO.
//
// Objects in ES5:
// Each object has a prototype chain.
//
// var obj = {a : 1}
//
// Prototype chain:
// obj -> Object.prototype -> null
//
//
// Each *function* has a different prototype chain.
//
// func f { console.log("js prototypes. uh.")}
//
// Prototype chain:
// f -> Function.prototype -> null
//
// Evidently someone didn't like JS's prototypal inheritance -
// so the keyword `class` was introduced in ES2015, along with
// other traditional OO keywords.
//
// The problem is they had to deal with backward compatibility, so
// they are not the same as you'd expect from java.
//
// The new ES2015 keywords are:
// class, constructor, static, extends, and super.
//
// Rules:
// * Don't add custom functions to base types. It clutters up built-in types,
//   and potentially steps on other libraries doing the same thing.
//
//
// NOTE : Hopefully ES6 (2015) saves us from this shit pile that is prototypal
//        inheritance.
//
test("object basics", () => {

    // Javascript objects are key/value pairs (associative arrays).
    // Here is an object literal.
    var p = {
        firstName: "damon",
        lastName: "allison",
        age: 41,
        fullName: function () {
            return this.firstName + " " + this.lastName;
        },
    };

    expect(p.fullName()).toEqual("damon allison");
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

    // Note that a new copy of this function will be created for every
    // object instance. Attach this object to the person Prototype
    // chain to reuse the same function across all instances.
    //
    // But prototypes suck, so use with caution.
    this.debugInfo = function() {
        return this.name + " " + this.created;
    }
}
Person.prototype.createAJoke = function() {
    return "Oh " + this.name + "... You're as silly as prototypal inheritance.";
};

//
// Here is a "derived" class - we simply call the "parent" constructor
// by passing in a `this` pointer and desired arguments.
//
function Teacher(name, subject) {
    Person.call(this, name);
    this.subject = subject;

    // Here, we override a function on Person.
    this.createAJoke = function() {
        return "Teacher, " + this.name + "... Teach a real language.";
    };
}

// Simply calling into the "parent" class above does not establish the
// inheritance chain we want. In order for an object to inherit another,
// you must establish the relationship at the prototype level.
Teacher.prototype = Object.create(Person.prototype);

// But we don't want teacher to inherit Person's constructor. Oy.
Teacher.prototype.constructor = Teacher;


//
// This test shows how to create objects using the "new" syntax.
//
test("constructors", () => {

    let p = new Person("damon");
    expect(p.name).toEqual("damon");
    expect(p.created).toBeDefined();
    expect(p.debugInfo).toBeDefined();
    expect(p.createAJoke()).toContain(p.name);

    // To determine if a property is a member of the top level object
    // and *not* defined further up the prototype chain...
    expect(p.hasOwnProperty("debugInfo")).toBeTruthy();
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

    let p = new Person("damon");
    expect(p instanceof Teacher).toBeFalsy(); // nope
    expect(p instanceof Person).toBeTruthy();
    expect(p instanceof Object).toBeTruthy();

    // If you want to examine an object's prototype.
    console.log("Person's prototype : " + Object.getOwnPropertyNames(Person.prototype));
    console.log("Teacher's prototype : " + Object.getOwnPropertyNames(Teacher.prototype));
});

test("json", () => {
    // String -> Object
    const json = '{"firstName" : "damon", "lastName" : "allison", "kids" : [ {"firstName" : "cole"} ]}';
    const obj = JSON.parse(json);

    expect(obj.firstName).toEqual("damon");
    expect(obj.kids[0].firstName).toEqual("cole");

    // Object -> String
    const str = JSON.stringify(obj);
    expect(str).toMatch(/firstName/); // exact string comparsion not important.

});