"use strict";

test("switch", () => {

    let a = "test";
    let val = "initial";

    switch (a) {
        case "damon":
        case "cole":
        case "test":
            val = "test";
            return;
    }
    expect(val).toBe("test");
});