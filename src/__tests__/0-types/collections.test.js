"use strict";

test('arrays', () => {

    //
    // Arrays in JS can contain values of different types.
    //
    const a1 = ["tree", 20, [1, 2, 3]];
    expect(typeof a1).toBe("object");
    expect(a1[0]).toEqual("tree");
    expect(a1[1]).toEqual(20);
    expect(a1[2]).toEqual([1, 2, 3]);

    // Copy the array via iteration.
    var a2 = []
    for(let i = 0; i < a1.length; i++) {
        a2.push(a1[i]);
    }
    expect(a1).toEqual(a2);

    // `slice()` will copy an array.
    expect(a1.slice()).toEqual(a1);
    expect(a1.slice()).not.toBe(a1);


    // 
    // Deleting objects
    //
    let a3 = [1, 2, 3];
    expect(a3.length).toBe(3);

    //
    // Delete will replace the value with `undefined`.
    //
    // **Don't use delete with arrays**. Use `pop` or `shift` 
    // as shown below.
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
test("sparse arrays", () => {

    let a = [];

    a[0] = 0;
    a[1] = undefined;
    a[9] = 9;

    expect(a.length).toBe(10);

    // Missing elements are `undefined`
    expect(a[2]).toBeUndefined();
    expect(typeof a[2]).toBe("undefined");

    // 
    // Enumeration will "skip" any elements which are not explicitly set,
    // even if set to `undefined`.
    //

    let count = 0
    for(let i in a) {
        count++
    }
    expect(a.length).toBe(10); // Remember - a is sparse
    expect(count).toBe(3);

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
    // Using an explicit cast will force ordinal access.
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
test("sets", () => {

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