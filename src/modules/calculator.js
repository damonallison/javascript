
// Each module can have a single default.
// This simplifies the import statment - avoiding the use of
//
// import Calculator from "../modules/calculator";

export default class Calculator {

    static add(x, y) {
        return x + y;
    }

    static subtract(x, y) {
        return x - y;
    }

}

export function echo(s) {
    return s;
}
