"use strict";

//
// ES6 introduces "modules"
//
// Modules allow you to abstract away functionality into individual files and
// selectively import pieces of functionality into our current scope.
//
// Prior to ES6, modules were "faked" by creating functions which returned
// objects that encapsulated functions and closed over state.
//
// The state of modules in JS is a holy mess. There wasn't an official standard
// until ES6. By then, the community created their own module format, CommonJS,
// which is used by node.
//
// These examples use CommonJS.

const calculator = require("../modules/calculator");

test("module-importing", () => {
    expect(calculator.add(2, 2)).toBe(4);
    expect(calculator.subtract(10, 2)).toBe(8);
});

// ----------------------------------------------------------------------------------
//
// NOTE:
//
// These notes are about ES6 modules. I wasn't able to get ES6 modules working.
// I need to understand what execution environment `npm test` runs under and
// what module system(s) it supports.
//
// ----------------------------------------------------------------------------------

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
// * See ../modules/calculator.js for examples of exporting.
//
// Importing
//
// There are a few ways to import members from a module.
//
// All non-default elements being imported from a module must be enclosed in
// curly braces.
//
// Default elements being imported do *not* need to be enclosed in curly braces.
// This is the most common way to implement members, since ideally each module
// should only export a single, default, element.
//
// import Calculator from "../modules/calculator";

//
// A "namespace import"
//
// All exports are referenced via the `CalculatorModule` object.
// The `CalculatorObject` becomes the "namespace" in which you access the module's exports.
//
// import * as CalculatorModule from "../modules/calculator";

// test("importing", () => {

//     expect(Calculator.add(2, 2)).toEqual(4);
//     expect(echo("test")).toEqual("test");

//     // Using namespace imports, access the default member with `default`.
//     expect(CalculatorModule.default.add(2, 2)).toEqual(4);
//     expect(CalculatorModule.echo("test")).toEqual("test");

// });
