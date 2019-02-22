//
// JavaScript type coercion.
//
// JavaScript has implicit and explicit type coercion.
//
// Coercions can be made explicit by casting a value to a primitive type.
//
// > let x = Number("42")
// > let y = String(42)
//
// Implicit Coercion
//
// Implicit coercion happens when operators are being applied to operands with
// different types.
//
// There are two primary scenarios for cohesion: equality (== and !=) and inequality (< and >).
//
// Equality:
//
// JavaScript has two equality operators - equality (== and !=) and strict
// equality (=== and !==).
//
// Coercion is *only* allowed with the non-strict equality operators.
// Coercion does not happen with strict equality operators.
//
// ==   Loose Equality. Type coercion occurs if necessary to perform the comparison.
// ===  Strict Equality. No type coercion occurs
//
// When deciding which equality operator to use, ask yourself:
//
// > When comparing these two values, do I want coercion or not?
//
// Type coercion rules for equality are found in the ES spec here:
// http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
//
// When performing equality on values with two different types (x == y) where Type(x) != Type(y):
//
// * If x is Number() and y is String(), perform x == ToNumber(y)
// * If y is Number() and x is String(), perform ToNumber(x) == y
// * If x is Boolean(), return ToNumber(x) == y
// * If y is Boolean(), return x == ToNumber(y)
//
//
// Type coercion can be broken down into a few actions, depending on the
// operand types.
//
// 1. Convert Boolean() to Number().
// 2. Convert String() to Number()
// 3. Compare.
//
//
// Note that coercion *only* happens with primitive types.
//
// > Objects, functions, and arrays are always compared by reference.
//
//
// Rules:
//
// To safely use implicit coercion, here are a few heuristic rules to follow:
//
// * If either side of the comparsion has `true` or `false`, always use ===.
// * If either side of the comparison can have "", [], or 0, consider using ===.
//


test("boolean coercion", () => {

    //
    // Explicit coercion
    //

    //
    // There are two ways to explicitly convert values into a boolean.
    //
    // 1. Use Boolean(val)
    // 2. Use !!
    //
    // #2 is idiomatic JS. prefer this.
    //
    // The unary negation operator (!) explicitly coerces the value to a boolean,
    // but it also flips the value from truthy to falsy or vice versa. Another !
    // will flip the parity back to the original.
    //
    const a = {};
    const d = "";

    expect(Boolean(a)).toBeTruthy();
    expect(Boolean(d)).toBeFalsy();

    expect(!!a).toBeTruthy();
    expect(!!d).toBeFalsy();

    //
    // Implicit coercion
    //
    //
    // Rule:
    //
    // If x or y is Boolean(), return the boolean to Number().
    //
    // ToNumber(false) == 0
    // ToNumber(true) == 1
    //
    //
    // 1. `false` converted to 0. 0 == "0".
    // 2. "0" converted to 0 (rule 1 above). 0 == 0
    // 3. return true
    //
    expect(false == "0").toBeTruthy();

    // If y is Boolean(), return the result of x == ToNumber(y)
    expect("0" == false).toBeTruthy();
    expect("1" == true).toBeTruthy();
    expect("2" == true).toBeFalsy();


    //
    // Watch out for *falsy* values, which always coerce into false.
    //
    expect(0 == "").toBeTruthy();     // Ouch, this sucks. JS is working off the "falsy" rules.
    expect(false == "").toBeTruthy(); // So does this.
    expect(false == []).toBeTruthy(); // And this.

    expect(0 === "").toBeFalsy();
    expect(false === "").toBeFalsy();
    expect(false === []).toBeFalsy();

});

//
// When one of two operands is a number, the other value is coerced into a Number.
//
test("number coercion", () => {

    //
    // x is a Number() and y is String(), perform x == ToNumber(y)
    //
    expect(0 == "0").toBeTruthy();
    //
    // y is a Number() and x is String(), perform ToString(x) == y
    //
    expect("0" == 0).toBeTruthy();

    //
    // Type cohesion is not allowed using "strict" equality.
    //
    expect("0" === 0).toBeFalsy();
    expect(0 === "0").toBeFalsy();

    const str = "42";

    //
    // String -> Number
    //
    // Using `Number()` is the most explicit type coercion function available
    // for casting strings into numbers.
    //
    const num = Number(str);
    expect(typeof num).toBe("number");
    expect(num).toBe(42);

    //
    // In the open source JS community, unary `+` is an accepted form
    // of explicit Number() type coercion.
    //
    const num2 = +num;
    expect(num2).toBe(42);

    //
    // Number -> String
    //

    // Option 1 : using an explicit String() cast. This is *not* idiomatic JS.
    const str2 = String(num2);
    expect(str2).toBe("42")

    // Option 2 : use `+ ""` - which is idiomatic JS. **Are you kidding me?**
    const str3 = num2 + "";
    expect(str3).toBe("42");

});

test("date coercion", () => {

    //
    // 1530973247103 == July 7th, 2018
    //
    const marker = 1530973247103;
    let d = new Date();

    // Coercing a date to a number will return the number of seconds
    // since the unix epoch (1970-01-01T00:00:00.000Z)
    expect(+d).toBeGreaterThan(marker);
    expect(Number(d)).toBeGreaterThan(marker);

    // Here is the preferred way to retrieve a timestamp.

    const timestamp = Date.now();
    expect(timestamp).toBeGreaterThan(marker);
});

//
// When object values are used in a string context, toString() is called
// on the object.
//
// All primitive values have a toString() defined.
//
test("custom toString()", () => {

    const num = 42.000;
    expect(num.toString()).toBe("42");

    const test = false;
    expect(test.toString()).toBe("false");

    const obj = {
        id: 100,
        name: "damon",
        toString() {
            return this.name;
        }
    };
    expect(obj == "damon").toBeTruthy();
});

//
//
// The `+` operator is overloaded to serve the purposes of both `Number` addition
// and `String` concatenation.
//
// If either operand to `+` is a string, the operation will be string concatenation.
//
test("+ operator", () => {

    expect("damon" + 100).toBe("damon100");
    expect(100 + "damon").toBe("100damon");

    expect(100 + "100").toBe("100100");

    // Explicit cast
    expect(100 + Number("100")).toBe(200);
    expect(100 + +"100").toBe(200); // uniary + is idiomatic JS.

    // Boolean true == 1
    expect(100 + true).toBe(101); // oy.
});

//
// Objects are only == or === when they point to themselves.
//
// Coercion does *not* happen with objects, so == and === are
// identical when dealing with objects.
//
test("object equality", () => {
    //
    // Objects, functions, and array equality,
    // whether using == or ===,
    //
    const obj  = { "name" : "damon" };
    const obj2 = { "name" : "damon" };

    expect(obj == obj2).toBeFalsy();
    expect(obj === obj2).toBeFalsy();

    expect(obj == obj).toBeTruthy();
    expect(obj === obj).toBeTruthy();

    //
    // Arrays are treated like objects when dealing with equality.
    //
    const arr  = [1, 2, 3];
    const arr2 = [1, 2, 3];

    expect(arr == arr2).toBeFalsy();
    expect(arr === arr2).toBeFalsy();

    expect(arr == arr).toBeTruthy();
    expect(arr === arr).toBeTruthy();

    //
    // Array has toString() defined on it. Therefore, if used from a
    // string context, it will be coerced into a string.
    //
    const arr3 = "1,2,3";
    expect(arr.toString()).toBe("1,2,3");
    expect(arr == arr3).toBeTruthy();


    //
    // When objects are used in equality comparisons, they are first converted
    // to primitive values.
    //
    // valueOf() should return the primitive value of an object.
    // toString() should return the string representation of an object.
    //
    let o1 = {
        id: 1,
        name: "damon",
        toString() {
            return this.name.toString();
        },
        valueOf() {
            return this.id;
        }
    };
    let o2 = {
        id: 2,
        name: "cole",
        toString() {
            return this.name.toString();
        },
        valueOf() {
            return this.id;
        }
    };

    expect(o1 < o2).toBeTruthy();
    expect(o1 == 1).toBeTruthy();

    // When used in a string context, toString() is called to convert the object to a primitive.
    expect(String(o1)).toBe("damon");

});


//
// If one value is an Object, the other is not, the following two rules apply.
//
// Essentially, the object is converted to a string or number based
// on the context in which it's used.
//
// * If Type(x) is either String or Number and Type(y) is Object,
//   return the result of the comparison x == ToPrimitive(y)
//
// * If Type(x) is Object and Type(y) is String or Number,
//   return the result of the comparison ToPrimitive(x) == y.
//
// The ToPrimitive() algorithm:
//
// * When the operation expects a string, a "string" hint is used and toString() is called.
// * When the operation expects a number, a "number" hint is used and toValue() is called.
//
test("object to non-object equality", () => {

    const obj1 = {
        a: 10,
        toString() {
            return String(this.a);
        },
        valueOf() {
            return this.a;
        }
    };

    const obj2 = {
        a: 10,
        toString() {
            return String(this.a);
        },
        valueOf() {
            return this.a;
        }
    };

    //
    // Number hint - calls valueOf()
    //
    expect(10 == obj1).toBeTruthy();
    expect(10 == obj2).toBeTruthy();

    // String hint - calls toString()
    expect(`Value is ${obj2}`).toBe("Value is 10");
    expect(`Value is ${obj1}`).toBe("Value is 10");

});

//
// Javascript's coercion rules for inequality are different than equality. (Shocker)
//
// If both values are strings, values are compared lexiographically.
// If one or both is *not* a string, both are coerced into numbers.
//
test("inequality", () => {


    const n1 = 42;
    const n2 = "43";
    const n3 = "44";

    expect(n1 < n2).toBeTruthy(); // Numeric comparison
    expect(n2 < n3).toBeTruthy(); // String comparison
    expect("299" < n2).toBeTruthy() // String comparison (lexiographically - 2 < 4). This is messed up.
    expect(Number("299") > n2).toBeTruthy(); // Better

    const foo = "foo";

    //
    // NaN is neither greater than or less than any other value.
    // Here, because one operand is numeric, foo is coerced into a Number, which returns NaN.
    //
    expect(foo >= n1).toBeFalsy();
    expect(foo <= n1).toBeFalsy();
});