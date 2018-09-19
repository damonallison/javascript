//
// ES6 Modules
//
// Modules provide the ability to encapsulate and organize code. By default,
// everything in the module is private to the module. Members must be exported
// to be visible outside the module.
//
// * Modules are file based - 1 module per file.
//
// * Use `export` to expose functionality outside the module. Anything not
//   `export`ed cannot be used outside the module.
//
//
// Exporting
//
// There are two ways to export members.
//
// 1. Named exports. Use the `export` attribute on any member.
// 2. Default export. Each module can export a single default member.
//
// Importing
//
// import * as calc from 'calculator';
//
// calc.ad

//
// You can have multiple "named" exports within a single module.
//
// ES6 prefers the approach of a single, default export to simplify the import
// syntax.
//
export function add(x, y) {
    return x + y;
};

export function sub(x, y) {
    return x - y;
};

//
// In order to keep the public API user friendly, you can
// export aliases. The consuming module uses the user friendly
// alias.
//
export { add as addition };
export { sub as subtraction };

export default class Calculator {
    static add(x, y) {
        return add(x, y);
    };
    static subtract(x, y) {
        return sub(x, y);
    }
};