import { expect, test } from "vitest";
import { setImmediate, setTimeout } from "timers/promises";

import _ from "lodash";

//
// This file contains notes and theory behind JavaScript's runtime and
// performance characteristics.
//
// Node.js does *not* support multithreading. Node is single threaded.
//
// In reality, only the main event loop runs on the main thread. Most of the I/O
// runs on separate threads, because the I/O APIs in Node.js are asynchronous /
// non-blocking by design, in order to accommodate the event loop.
//
// Promises changed the nature of where the event loop is managed. In pre-ES6
// days, the event loop was managed by the hosting environment. Because ES6
// introduces promises, event loop management moved into the JS engine.
//
// The single threaded nature of JS engines prevents us from having to deal with
// multithreading, which is a huge win.
//
//
// Callbacks
//
// Callbacks were the original "async" pattern in JS. Pass functions to be
// invoked at some later point in time.
//
// There are multiple problems with callbacks.
//
// 1. The callback may be executed before you can establish a listener.
// 2. Tracking completion of multiple callbacks is manual.
// 3. Chaining callbacks results in confusing "callback hell".
//
// All of these problems are addressed with Promises.
//

test("promises", async () => {
  const completions = new Set<string>();
  const expected = new Set<string>(["immediate", "timeout"]);

  function complete(completed: string) {
    console.log("adding completion", completed);
    completions.add(completed);
  }
  function onImmediate(): void {
    complete("immediate");
  }
  function onTimeout(): void {
    complete("timeout");
  }

  await setImmediate(onImmediate());
  await setTimeout(20, onTimeout());

  expect(_.isEqual(completions, expected)).toBe(true);
});
