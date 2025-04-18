import { expect, test } from "vitest";

//
// A known good function which can be used to verify the output of a number.
//
function prove(i: number) {
  let msg = "";
  if (i % 3 == 0) msg += "fizz";
  if (i % 5 == 0) msg += "buzz";
  return msg || `${i}`;
}

test("fizz-buzz-first-try", () => {
  for (let i = 0; i < 100; i++) {
    let by3 = i % 3 == 0;
    let by5 = i % 5 == 0;
    let result = `${i}`;

    if (by3 && by5) {
      result = "fizzbuzz";
    } else if (by5) {
      result = "buzz";
    } else if (by3) {
      result = "fizz";
    }
    expect(prove(i)).toBe(result);
  }
});

//
// Changes in this version:
//
// 1. From 1 to 100 (inclusive).
// 2. No state variables.
//
test("fizz-buzz-second-try", () => {
  for (let i = 1; i <= 100; i++) {
    let result = `${i}`;
    if (i % 15 == 0) {
      result = "fizzbuzz";
    } else if (i % 5 == 0) {
      result = "buzz";
    } else if (i % 3 == 0) {
      result = "fizz";
    }
    expect(prove(i)).toBe(result);
  }
});

//
// Changes in this version:
//
// 1. Builds a single msg string up with each loop iteration.
// 2. Uses the logical || operator, which takes advantage of "" being "falsy" in
//    JS and prints the number when the iteration does not match fizz or buzz.
//
test("fizz-buzz-third-try", () => {
  let msg = "";
  for (let i = 1; i <= 100; i++, msg = "") {
    if (i % 3 == 0) msg += "fizz";
    if (i % 5 == 0) msg += "buzz";
    expect(prove(i)).toBe(msg || `${i}`);
  }
});
