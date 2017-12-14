//
// ES6 introduces "modules"
//
// Modules:
//
// * Run in `strict mode`.
// * Must export anything that should be publicly available.
// * May import bindings from other modules.
//
//
// What are the differences between node.js's / ES6 modules (called "packages" in node?)
//

import Calculator, { echo } from "../modules/calculator";

//
// A "namespace import" : all exports are referenced
// via the `CalculatorModule` "namespace"
//
import * as CalculatorModule from "../modules/calculator";

test("importing", () => {

    expect(Calculator.add(2, 2)).toEqual(4);
    expect(echo("test")).toEqual("test");

    // Using namespace imports, access the default member with `default`.
    expect(CalculatorModule.default.add(2, 2)).toEqual(4);
    expect(CalculatorModule.echo("test")).toEqual("test");

});