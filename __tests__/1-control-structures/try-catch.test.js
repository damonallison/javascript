import { expect, test } from "vitest";

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
  } catch (err) {
    expect(err instanceof Error).toBe(true);
    //
    // Use the stack property for a read only string representation of the call stack.
    //
    expect(err instanceof Error).toBeTruthy();
    expect(err.message).toBe("oops");
    expect(err.name).toBe("Error");
    expect(typeof err.stack).toBe("string");
  }

  //
  // But, you can legally throw any value you want.
  //
  let finallyExectued = false;

  try {
    throw "hello";
  } catch (err) {
    expect(typeof err).toBe("string");
    expect(err).toBe("hello");
  } finally {
    finallyExectued = true;
  }
  expect(finallyExectued).toBeTruthy();
});
