//
// ES6 classes
//
// Classes in ES6 are syntactic sugar around prototypal inheritance.
//
// * All code inside of classes run in strict mode automatically.
//

class Person {
    //
    // Class properties can only be set in the constructor and
    // from within methods. General guidance suggests that you
    // should accept all state in an object's constructor
    //
    constructor(name) {
        if (typeof name === "undefined") {
            throw Error("name is required");
        }
        if (typeof name !== "string") {
            throw Error("name must be a string");
        }

        this.name = name;
        this.createdDate = Date();
    }

    //
    // Note that properties are defined as functions, however
    // when calling them, they are invoked as properties. They are
    // stored on the object as properties.
    //
    get capitalizedName() {
        return this.name.toLocaleUpperCase();
    }
    set capitalizedName(value) {
        this.name = value.toLocaleLowerCase();
    }

    // TODO : what magic property do we need to implement
    // to handle printing a string correctly from console.log?
    toString() {
        this.lastUpdated = Date();
        return `${this.name} \
was created on ${this.createdDate}. \
Last updated ${this.lastUpdated}`;
    }

    static personFactory(name) {
        return new Person(name);
    }
}

class Teacher extends Person {
    constructor(name, subject, students) {
        // When extending from a base class, you must first call `super`
        // before using `this`.
        super(name);
        this.subject = subject;
        this.students = students;
    }

    toString() {
        return `${super.toString()} with ${this.students.length} students.`;
    }

}
test("class-creation", () => {

    let p = new Person("damon");

    expect(p instanceof Person).toBeTruthy();
    expect(p instanceof Object).toBeTruthy();

    expect(p.capitalizedName).toBe("DAMON");

    p.name = "cole";
    expect(p.capitalizedName).toBe("COLE");
});

test("singleton", () => {

    let p2 = new class {
        constructor(name) {
            this.name = name;
        }
    }("damon");

    expect(p2.name).toBe("damon");

});

test("factory", () => {

    let p = Person.personFactory("damon");
    expect(p.capitalizedName).toBe("DAMON");

});

test("inheritance", () => {
    let t = new Teacher("damon", "math", ["grace", "lily", "cole"]);

    expect(t instanceof Teacher).toBeTruthy();
    expect(t instanceof Person).toBeTruthy();
    expect(t instanceof Object).toBeTruthy();

    console.log(t.toString());

});