/**
 * Reactive programming is an asynchronous programming paradigm concerned with
 * data streams and the propogation of change.
 *
 * - Wikipedia (https://en.wikipedia.org/wiki/Reactive_programming)
 *
 * Why observables?
 *
 * * Observables can deliver multiple values of any type. The API for receiving
 *   values is the same whether the values are delivered synchronously or
 *   asychronously.
 *
 * * Subscribing / unsubscribing to Observables is the same regardless of what
 *   data the observable stream contains.
 *
 * `from` will create an Observable from a promise
 */
import { of, from } from 'rxjs';
import { Observer, Observable} from 'rxjs';

import { map } from 'rxjs/operators';

/**
 * Creates a simple observer.
 */
test("rxjs-simple-observer", done => {

    const myObservable = of(1, 2, 3);
    let results: Number[] = [];

    //
    // A handler for receiving observable notifications implements the Observer
    // interface. It is an object that defines callback methods to handle the
    // three types of notifications that an observer can send:
    //
    // next(val) - Required. Invoked when a new event is being published. Called
    //                       zero or more times.
    //
    // error(err) - Optional. A handler for an error notification. An error
    //                        halts execution of the observable instance.
    //
    // complete() - Optional. A handler for the execution-complete notification.
    //
    const observer = {
        next: (x: Number) => {
            results.push(x);
        },
        error: (err: String) => {
            expect(true).toBeFalsy(); // Fail this test
        },
        complete: () => {
            expect(results).toEqual([1, 2, 3]);
            done();
        }
    };

    myObservable.subscribe(observer);

});

/**
 * Create a simple Observable.
 *
 * The Observable constructor takes a function (called the "subscriber
 * function") that will be invoked when the Observable's `subscribe()` method is
 * called. The subscriber function receives an `Observer` object, and can
 * publish values to the Observer's `next`, `error`, and `complete` functions.
 */
test("rxjs-simpler-observable", done => {

    let actions: String[] = [];
    // This function is run when subscribe() is called.
    let sequenceSubscriber = (observer: Observer<Number>) => {
        actions.push("inSubscriber");
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();

        //
        // TODO: Why do we need to return an object with an "unsubscribe"
        // function?
        //
        // This must be automatically invoked by the RxJS engine when the
        // subscriber unsubscribes - allowing you to clean up.
        //
        return { unsubscribe() {}};
    }

    const sequence = new Observable(sequenceSubscriber);

    // The subscriber function is not invoked until a subscriber subscribes.
    expect(actions.length).toBe(0);

    let results: Number[] = [];
    sequence.subscribe( {
        next(num) { results.push(num) },
        complete() {
            done();
        }
    });
});

/**
 * Creates an Observable from a Promise
 */
test("rxjs-from", done => {

    let actions: string[] = [];

    const makeP = (success: boolean): Promise<string> => {
        actions.push("makeP");
        return new Promise((resolve, reject) => {
            actions.push("inPromise");
            success ? resolve("yes") : reject("no");
        });
    };
    const ob = from(makeP(true));

    ob.subscribe( {
        next(resp) {
            expect(resp).toBe("yes");
        },
        error(err) {
            expect(true).toBeFalsy(); // Fail this test
        },
        complete() {
            expect(actions.length).toBe(2);
            expect(actions).toEqual(["makeP", "inPromise"]);
            done();
        }
    });
});


/**
 * Multicasting
 *
 *
 */