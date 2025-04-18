import { expect, test } from "vitest";
//
// Proxies allow you to create handler objects which contain traps. Your code
// interacts with the proxy, which invokes traps, optionally calling into it's
// target object.
//
// Proxies can be revokable (not shown here). Revokable proxies are proxies
// which can be disabled or removed from observing.
//
// Proxy
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
//
test("proxies-basic", () => {
  let accesses = 0;

  class Foo {
    constructor(name) {
      this.name = name;
    }
    echo() {
      return this.name;
    }
  }

  const logger = {
    //
    // This proxy will trap (intercept) any property get.
    //
    get(obj, prop) {
      if (prop === "name") {
        accesses++;
      }
      return obj[prop];
    },
  };

  const f = new Foo("damon");
  const proxy = new Proxy(f, logger);

  expect(proxy.name).toBe("damon");
  expect(accesses).toBe(1);

  //
  // `proxy` does not trap a function call.
  // `echo()` will pass thru the proxy to the target object.
  //
  expect(proxy.echo()).toBe("damon");
  expect(accesses).toBe(2);
});
