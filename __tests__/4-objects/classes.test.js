import { expect, test } from "vitest";

import Person from "../../app/model/person";
import Teacher from "../../app/model/teacher";
import NameError from "../../app/model/name-error";

//
// ES6 classes
//
// Classes in ES6 are syntactic sugar around prototypal inheritance. Prototypcal
// inheritance allows an object to inherit properties and methods from a parent
// object.
//
// The perferred way to use prototypal inheritance is to use classes.
//
// All code inside of classes run in strict mode automatically.
//
/**
 * Use `typeof` to determine a primitive's type.
 */
test("typeof-for-primitives", () => {
  let n = 1;
  expect(typeof n).toBe("number");

  let s = "damon";
  expect(typeof s).toBe("string");

  let b = true;
  expect(typeof b).toBe("boolean");

  let o = {};
  expect(typeof o).toBe("object");

  let f = function () {};
  expect(typeof f).toBe("function");

  let a = [];
  expect(typeof a).toBe("object");
});

/**
 * Use instanceof to determine an object's type.
 */
test("classes-instanceof", () => {
  let p = new Person("damon");

  // typeof will not be much use since all objects are "object".
  expect(typeof p).toBe("object");

  expect(p instanceof Object).toBeTruthy();
  expect(p instanceof Person).toBeTruthy();
  expect(p instanceof Teacher).toBeFalsy();

  let t = new Teacher("damon", "math", []);
  expect(p instanceof Object).toBeTruthy();
  expect(t instanceof Person).toBeTruthy();
  expect(t instanceof Teacher).toBeTruthy();
});

test("classes-member-access", () => {
  let p = new Person("damon");

  // Property access.
  p.name = "cole"; // get
  p.createdDate = new Date(); // this should *not* be allowed when we convert to ts.

  // Custom getter / setter access.
  expect(p.capitalizedName).toBe("COLE"); // get
  expect(p.name).toBe("cole");

  // Method invocation.
  expect(p.toString()).toMatch(/created on.*last updated/i);
});

//
// Class instances are *not* locked. Members can be added or removed just
// like any other JS object.
//
// This is completely screwed! You can delete members which the class
// depends on!
//
test("classes-member-deletion", () => {
  let p = new Person("test");

  expect(p.name).toBe("test");

  // Add a member
  p.test = "wtf";
  expect(p.test).toBe("wtf");
  delete p.test;
  expect(p.test).toBeUndefined();

  // Delete a member
  delete p.name;
  try {
    expect(p.name).toBeUndefined();

    // Now that we don't have `name`, the class is broken.
    // Call a method which depends on `name` to exist, which will
    // throw a `TypeError`.
    p.capitalizedName;
    expect(false).toBeTruthy(); // fail test
  } catch (e) {
    expect(e instanceof TypeError).toBeTruthy();
  }
});

//
// Extend `Error` to create custom error types.
//
test("classes-custom-error", () => {
  try {
    throw new NameError("you're not welcome here", "damon");
  } catch (e) {
    expect(e instanceof NameError).toBeTruthy();
    expect(e.name).toBe("damon");
    expect(e.stack).toBeDefined();
  }
});

test("classes-singleton", () => {
  // // Not sure what value this provides over an object literal like this:
  // let p2 = {
  //     name: "damon"
  // }

  let p2 = new (class {
    constructor(name) {
      this.name = name;
    }
  })("damon");

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
  expect(t.toString()).toMatch(/^damon.*students.$/i);
});
