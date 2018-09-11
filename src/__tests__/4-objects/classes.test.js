//
// ES6 classes
//
// Classes in ES6 are syntactic sugar around prototypal inheritance.
//
// * All code inside of classes run in strict mode automatically.
//
class Person {
    constructor(name) {
        if (typeof name === "undefined") {
            throw Error("name is required");
        }
        if (typeof name !== "string") {
            throw Error("name must be a string");
        }

        this.name = name;
        this.createdDate = Date();
    };

    //
    // Note that properties are defined as functions, however when calling them,
    // they are invoked as properties. They are stored on the object as
    // properties.
    //
    get capitalizedName() {
        return this.name.toLocaleUpperCase();
    };
    set capitalizedName(value) {
        this.name = value.toLocaleLowerCase();
    };
    toString() {
        this.lastUpdated = Date();
        return `${this.name} was created on ${this.createdDate}. Last updated ${this.lastUpdated}`;
    };

    //
    // An example static function.
    //
    static personFactory(name) {
        return new Person(name);
    };
};

class Teacher extends Person {
    constructor(name, subject, students) {
        // When extending from a base class, you must first call `super`
        // before using `this`.
        super(name);
        this.subject = subject;
        this.students = students;
    };

    toString() {
        return `${super.toString()} with ${this.students.length} students.`;
    }
}

//
// Shows use of property accessors and methods.
//
test("class-basics", () => {

    let p = new Person("damon");

    expect(typeof p).toBe("object");
    expect(p instanceof Object).toBeTruthy();
    expect(p instanceof Person).toBeTruthy();
    expect(p instanceof Teacher).toBeFalsy();

    // Shows use of property get/set invocation.
    p.name = "cole";
    expect(p.capitalizedName).toBe("COLE"); // get
    p.capitalizedName = "DAMON"; // set
    expect(p.name).toBe("damon");

    // Method invocation.
    expect(p.toString()).toMatch(/created on.*Last updated/i);

    // Classes are *not* locked. Additonal state can be added.
    p.test = "test";
    expect(p.test).toBe("test");
});

test("singleton", () => {

    // // Not sure what value this provides over an object literal like this:
    // let p2 = {
    //     name: "damon"
    // }

    let p2 = new class {
        constructor(name) {
            this.name = name;
        }
    }("damon");

    expect(p2.name).toBe("damon");
});

//
// Static methods are
test("static-methods", () => {

    let p = Person.personFactory("damon");
    expect(p.capitalizedName).toBe("DAMON");

});

test("inheritance", () => {
    let t = new Teacher("damon", "math", ["grace", "lily", "cole"]);

    expect(t instanceof Teacher).toBeTruthy();
    expect(t instanceof Person).toBeTruthy();
    expect(t instanceof Object).toBeTruthy();

    expect(t.name).toBe("damon");
    expect(t.subject).toBe("math");

    // Verifies `super` works, that `Person.toString()` is executed.
    expect(t.toString()).toMatch(/^damon.*students.$/i)

});