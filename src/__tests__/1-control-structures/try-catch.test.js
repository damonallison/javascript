"use strict";

//
// Error Handling (try / catch)
//

test("error handling", () => {

    //
    // You typically want to throw an error object.
    // 
    // Error will have the stack trace, which is handy.
    //
    try {
        throw new Error("oops");
    }
    catch (err) {
        expect(err instanceof Error).toBeTruthy();

        // Use the stack property for a read only string representation of the call stack.
        expect(typeof err.stack).toBe("string");

        console.log(typeof err.stack);
        console.log(err.stack);
        if (err instanceof Error) {
            console.log("horray");
        }
    }

    // 
    // But, you can legally throw any value you want.
    //
    try {
        throw "hello";
    }
    catch(err) {
        expect(typeof err).toBe("string");
        expect(err).toBe("hello");
    }

});