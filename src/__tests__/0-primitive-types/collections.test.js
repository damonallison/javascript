"use strict";

//
// Arrays in JS are not typed.
//
test('arrays', () => {

    const a1 = ["tree", 20, [1, 2, 3]];
    expect(typeof a1).toBe("object");

    expect(a1[0]).toEqual("tree");

    // Copy the array via iteration.
    var a2 = []
    for(let i = 0; i < a1.length; i++) {
        a2.push(a1[i]);
    }
    expect(a1).toEqual(a2);

    // `slice()` will copy an array.
    expect(a1.slice()).toEqual(a1);
});


//
// Sets and Maps
//
// ES6 introduces Set, Map, WeakSet, and WeakMap.
//
// Weak[Set|Map] is good for storing objects to which you do not
// own the lifetime - like storing DOM elements.
//
// Note that the *key* values are weak. When the key is GC'd,
// it will be removed from the collection. The value is not stored weak.
//
test("sets", () => {

    let set = new Set();
    set.add(1);
    set.add("1");

    expect(set.size).toBe(2);

    let found = new Set();

    // Set iteration using `forEach`
    // `key` and `value` are identical for sets.
    set.forEach((value) => {
        found.add(value);
    });

    expect(set).toEqual(found);

    set.delete("1");
    set.delete("test"); // ok to remove a value not in the set.

    expect(set.size).toBe(1);
    expect(set.has(1)).toBeTruthy();

    set.clear();
    expect(set.size).toBe(0);
});

test("maps", () => {
    let map = new Map();

    map.set("name", "damon");
    map.set("age", 41);

    expect(map.has("name")).toBeTruthy();
    expect(map.get("name")).toBe("damon");

    map.delete("age");
    map.clear();


    let wMap = new WeakMap();
    let name = {}; // keys must be objects.
    wMap.set(name, "damon");
    expect(wMap.has(name)).toBeTruthy();

    name = null;
    expect(wMap.has(name)).toBeFalsy();

});