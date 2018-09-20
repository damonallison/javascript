"use strict";

import _ from "lodash"

//
// Up until ES6, Object and Array were the only two data structures.
//
// ES6 adds Map and Set, along with their WeakMap and WeakSet equivalents.
//
test('collections-arrays', () => {

    //
    // Arrays in JS can contain values of different types.
    //
    const a1 = ["tree", 20, [1, 2, 3]];

    // Determining if an object is an Array.
    expect(a1 instanceof Array).toBeTruthy();
    expect(typeof a1).toBe("object");

    // Arrays are indexed 0-based.
    expect(a1[0]).toEqual("tree");
    expect(a1[1]).toEqual(20);
    expect(a1[2]).toEqual([1, 2, 3]);

    // Copy the array via iteration.
    const a2 = []
    for(let i = 0; i < a1.length; i++) {
        a2[i] = a1[i];
    }
    expect(a1).toEqual(a2);

    // `slice()` will copy an array.
    expect(a1.slice()).toEqual(a1);
    expect(a1.slice()).not.toBe(a1);


    //
    // Deleting objects
    //
    const a3 = [1, 2, 3];
    expect(a3.length).toBe(3);

    //
    // Delete will replace the value with `undefined`.
    //
    // **Don't use delete with arrays**.
    //
    // Use `pop` or `shift` as shown below.
    //
    delete a3[0];
    expect(a3[0]).not.toBeDefined();
    expect(a3.length).toBe(3);

    //
    // Use `pop` or `shift` to remove elements from the array.
    //
    // Shift removes and returns the left most item in the list.
    //
    expect(a3.shift()).not.toBeDefined();
    expect(a3).toEqual([2, 3]);

    //
    // Pop removes and returns the right most item in the list.
    //
    expect(a3.pop()).toBe(3);
    expect(a3).toEqual([2]);
});

//
// Array length is the highest ordinal in the array.
//
// * Arrays do not have to be contiguous.
// * If elements are missing, they will be returned as "undefined".
// * Only elements which are explicity set will be included in iteration.
//
// Yes, this sucks.
//
test("collections-sparse-arrays", () => {

    let a = [];

    a[0] = 0;
    a[1] = undefined;
    a[9] = 9;

    expect(a.length).toBe(10);

    // Missing elements are `undefined`
    expect(a[2]).toBeUndefined();

    //
    // Arrays are like any JS object. You can add any properties
    // you want to the array. You should *not* do this - use another
    // object if want to store state.
    //

    let a2 = [1, 2, 3];
    a2["test"] = "test"; // not part of the array
    expect(a2.length).toBe(3);

    a2["2"] = "test"; // watch out for string ordinals!
    expect(a2.length).toBe(3);

    //
    // Using an explicit cast will force ordinal access. Use this when you have
    // a string value you want to turn into an ordinal.
    //
    a2[Number("2")] = 100;
    expect(a2.length).toBe(3);
    expect(a2[2]).toBe(100);

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
test("collections-sets", () => {

    let set = new Set();
    set.add(1);
    set.add("1");

    expect(set.size).toBe(2);
    expect(set.has(Number(1))).toBeTruthy();
    expect(set.has("1")).toBeTruthy();

    let found = new Set();

    //
    // Set iteration using `forEach`
    // `key` and `value` are identical for sets.
    for(let val of set) {
        found.add(val);
    }

    expect(set).toEqual(found);

    set.delete("1");
    set.delete("test"); // ok to remove a value not in the set.

    expect(set.size).toBe(1);
    expect(set.has(1)).toBeTruthy();

    set.clear();
    expect(set.size).toBe(0);
});

//
// Objects in JS are techncially maps. JS objects can only store string keys.
//
// In general, whenever you are using dealing with collections, use Map, not Object.
//
test("collections-maps", () => {
    let map = new Map();

    map.set("name", "damon");
    map.set("age", 41);

    expect(map.has("name")).toBeTruthy();
    expect(map.get("name")).toBe("damon");

    map.delete("age");
    expect(map.has("age")).toBeFalsy();


    //
    // WeakMap will remove an object from the Map when all references to the key
    // are null (or GC'd).
    //
    // Weak data structures are useful when you don't control the lifetime of
    // the objects being used in the map - like DOM elements.
    //
    let wMap = new WeakMap();
    let name = {}; // keys must be objects.
    wMap.set(name, "damon");
    expect(wMap.has(name)).toBeTruthy();

    name = null;
    expect(wMap.has(name)).toBeFalsy();

});
