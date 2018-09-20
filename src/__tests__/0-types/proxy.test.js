"use strict";

//
// Proxies allow you to create objects which wrap other objects. Your code
// interacts with the proxy, which marshals calls to it's target object.
//
// Proxies can be revokable (not shown here). Revokable proxies are proxies
// which can be disabled or removed from observing.
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
    };

    const logger = {

        //
        // This proxy will trap (intercept) any property get.
        //
        get(obj, prop) {
            if (prop === "name") {
                accesses++;
            }
            return obj[prop];
        }


    };

    const f = new Foo("damon");
    const proxy = new Proxy(f, logger);

    expect(proxy.name).toBe("damon");
    expect(accesses).toBe(1);

    expect(proxy.echo()).toBe("damon");
    expect(accesses).toBe(2);

});