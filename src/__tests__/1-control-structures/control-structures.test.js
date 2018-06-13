"use strict";

test("switch", () => {

    let a = "test";

    switch (a) {
        case "damon":
        case "cole":
        case "test":
            return;
    }
    expect(false).toBeTruthy();

});