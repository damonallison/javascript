import { expect, test } from "vitest";
//
// ES6 introduces "modules"
//
// Modules allow you to abstract away functionality into individual files and
// selectively import pieces of functionality into your current scope / file.
//
// Each module has it's own scope and can encapsulate (hide) state.
//
// Prior to ES6, modules were "faked" by creating functions which returned
// objects that encapsulated functions and closed over state.
//
// The state of modules in JS is a holy mess. There wasn't an official standard
// until ES6. By then, the community created their own module formats - AMD,
// UMD, CommonJS (which is used by node). Eventually, the ES6 module system will
// be de-facto.
//
//
//
// Modules:
//
// * Run in `strict mode`.
// * Must export anything that should be publicly available.
// * May import bindings from other modules.
//
// In order to understand modules, you must understand exporting and importing.
//
// Exporting:
//
// * See ../modules/calculator.js for examples of exporting.
//
// Importing:
//
// The golden rule with importing is to *only import what you need*. This
// reduces the amount of code that packing utilities need to distribute with
// your application.
//
// There are a few ways to import members from a module.
//
// All non-default named elements being imported from a module must be enclosed
// in curly braces.
//
// Default elements being imported do *not* need to be enclosed in curly braces.
// This is the most common way to implement members, since ideally each module
// should only export a single, default, element.
//
// import Calculator from "../modules/calculator";
//

// Imports the default class as "Calculator", named exports `add` and `sub`.
import Calculator, { add, sub } from "../modules/calculator";

// Imports named exports addition and subtraction, which were exported as
// aliases.
import { addition, subtraction } from "../modules/calculator";

// Imports add, aliasing it locally to `addMe`.
import { add as addMe } from "../modules/calculator";

test("es-module-import", () => {
  // Default import
  expect(Calculator.add(2, 2)).toBe(4);

  // Named imports
  expect(add(2, 2)).toBe(4);
  expect(sub(4, 2)).toBe(2);

  // Named imports which were exported as aliases
  expect(addition(2, 2)).toBe(4);
  expect(subtraction(4, 2)).toBe(2);

  // Aliased import
  expect(addMe(2, 2)).toBe(4);
});

//
// A "namespace import"
//
// A namespace import allows you to import *all* bindings to be available under
// a common identifier (namespace).
//
// Here, all exports are accessed via the `CalculatorModule` object. The
// `CalculatorObject` becomes the "namespace" in which you access the module's
// exports.
//
// The "default" export is literally accessed using `default`.
//

import * as CalculatorModule from "../modules/calculator";

test("es-module-namespace-import", () => {
  // Using namespace imports, access the default member with `default`.
  expect(CalculatorModule.default.add(2, 2)).toBe(4);
  expect(CalculatorModule.addition(2, 2)).toBe(4);
});

// CommonJS

const calculator = require("../modules/calculator-commonjs");

test("module-importing", () => {
  expect(calculator.addition(2, 2)).toBe(4);
  expect(calculator.subtraction(10, 2)).toBe(8);
});
