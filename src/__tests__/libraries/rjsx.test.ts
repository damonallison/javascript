/**
 * `from` will create an Observable from a promise
 */
import { from } from 'rxjs';

import { map } from 'rxjs/operators';

/**
 * Creates an Observable from a Promise
 */
test("rxjs-from", () => {

    let results = [];
    const p = new Promise((resolve) => {
        results.push("executed promise");

        let cb = () => {
            resolve("yes");
        };
        setTimeout(cb, 100);
    });

    return new Promise((resolve) => {
        const ob = from(p);
        ob.subscribe( {
            next(resp) {
                console.log(`Response is ${resp}`)
            },
            error(err) { console.log(`Error is ${err}`)},
            complete() {
                console.log(`Complete`);
                resolve();
            }
        });

    });

});