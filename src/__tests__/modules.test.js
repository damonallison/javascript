//
// ES6 introduces "modules"
//
// * Prior to modules, javascript was essentially a global, "shared everything" environment.
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
// All non-default elements being imported from a module
// must be enclosed in curly braces.
//
import { echo } from "../modules/calculator";

//
// Default elements being imported do *not* need to be enclosed
// in curly braces. This is the most common way to implement
// members, since ideally each module should only export a single, default, element.
//
import Calculator from "../modules/calculator";

//
// A "namespace import"
//
// All exports are referenced via the `CalculatorModule` object.
// The `CalculatorObject` becomes the "namespace" in which you access the module's exports.
//
import * as CalculatorModule from "../modules/calculator";

test("importing", () => {

    expect(Calculator.add(2, 2)).toEqual(4);
    expect(echo("test")).toEqual("test");

    // Using namespace imports, access the default member with `default`.
    expect(CalculatorModule.default.add(2, 2)).toEqual(4);
    expect(CalculatorModule.echo("test")).toEqual("test");

});