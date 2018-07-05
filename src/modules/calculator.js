//
// Module example.
//
// Exporting:
//
// There are two ways to export code from modules.
//
// 1. Place `export` in front of any variable or function to export it.
// export function sum()
//
// 2. Export it later
// function sub(x, y) {
//   return x - y;
//}
//
// export { sub }
//
//
// Default export
//
// Each module can have a single default export.
//
// This simplifies the import statement - avoiding the use of
//
// import Calculator from "../modules/calculator";
//

export default class Calculator {

    static add(x, y) {
        return x + y;
    }

    static subtract(x, y) {
        return x - y;
    }

}

function echo(s) {
    return s;
}

export { echo };