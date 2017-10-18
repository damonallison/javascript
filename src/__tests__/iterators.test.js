//
// ES6 added iterators and generators
//
// Iterators : a custom object which provides an interface for iteration (IEnumerable)
// Generator : A function which returns an iterator.
//             A generator function which has a `*` character in front of the name.

test("iterators", () => {
    let data = new Map();

    data.set("name", "damon");

    // Using object destructuring to iterate maps
    for (let [key, value] of data) {
        expect(key).toBe("name");
        expect(value).toBe("damon");
    }
});

test("custom-iterator", () => {

    let myObj = {

        count: 10,

        //
        // The Symbol.iterator symbol function makes a custom
        // object iterable. This is a generator function as
        // denoted with the `*` char.
        //
        *[Symbol.iterator]() {
            for (let iter = 0; iter < this.count; iter++) {
                yield iter;
            }
        }
    };

    // Simulates updating an object in a way which impacts
    // the iterated values.
    myObj.count = 100;
    let iterated = [];

    // for-of uses the custom generator.
    for (let x of myObj) {
        iterated.push(x);
    }

    // for-of obviously works with built in collection types
    // as well.
    for (let x of iterated) {
        // do something with x...
    }

    expect(iterated.length).toBe(myObj.count);
});