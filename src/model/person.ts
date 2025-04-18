//
// A simple class to show ES6 class syntax.
//
// See "../__tests__/4-objects/classes.test.js"
//
export default class Person {
  private readonly name: string;
  private readonly createdDate: Date;
  private lastUpdatedDate: Date;

  constructor(name: string) {
    if (typeof name === "undefined") {
      throw Error("name is required");
    }
    if (typeof name !== "string") {
      throw Error("name must be a string");
    }

    this.name = name;
    this.createdDate = new Date();
    this.lastUpdatedDate = new Date();
  }

  //
  // An example static function.
  //
  static personFactory(name: string) {
    return new Person(name);
  }

  //
  // Note that properties are defined as "get" and "set" functions, however when
  // calling them, they are invoked as properties. They are stored on the object
  // as properties.
  //
  // console.log(obj.capitalizedName);  // calls get capitalizedName()
  // obj.capitalizedName = "new value"; // calls set capitalizedName(value: string)
  //
  get capitalizedName() {
    return this.name.toLocaleUpperCase();
  }

  toString() {
    return `${this.name} was created on ${this.createdDate}. Last updated ${this.lastUpdatedDate}`;
  }
}
