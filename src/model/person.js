//
// A simple class to show ES6 class syntax.
//
// See "../__tests__/4-objects/classes.test.js"
//
export default class Person {
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
