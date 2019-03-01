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
    //                        Because observables are asynchronous, Observables
    //                        will not catch errors. You handle errors by
    //                        specifying an error callback.
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

    expect.assertions(3);

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
    };

    const sequence = new Observable(sequenceSubscriber);

    //
    // The subscriber function is not invoked until a subscriber subscribes.
    //
    expect(actions.length).toBe(0);

    let results: Number[] = [];

    sequence.subscribe( {
        next(num) { results.push(num) },
        complete() {
            expect(results).toEqual([1, 2, 3]);
            expect(actions).toEqual(["inSubscriber"]);
            done();
        }
    });
});

/**
 * Creates an Observable from a Promise
 */
test("rxjs-from", done => {

    expect.assertions(2);

    let actions: string[] = [];

    const genP = (success: boolean): Promise<string> => {
        return new Promise((resolve, reject) => {
            actions.push("inPromise");
            success ? resolve("yes") : reject("no");
        });
    };

    //
    // The promise executor function is invoked immediately. So the promise has
    // been resolved, even tho we do not have a subscriber.
    //
    const p = genP(true);
    expect(["inPromise"]).toEqual(actions);

    //
    // Creates an Observable from a Promise
    //
    const ob = from(p);
    ob.subscribe( {
        next(resp) {
            expect(resp).toBe("yes");
        },
        error(err) {
            expect(true).toBeFalsy(); // Fail this test
        },
        complete() {
            done();
        }
    });
});


/**
 * Multicasting
 *
 * Multicasting allows you to notify multiple subscribers from a single event source.
 *
 */
test("rxjs-multicast", done => {

    // Will run through an array of numbers, emitting one value per second
    // until it gets to the end of the array.
    function doSequence(observer: Observer<number>, arr: any[], idx: number) {
        return setTimeout(() => {
            observer.next(arr[idx]);
            if (idx === arr.length - 1) {
                observer.complete();
            } else {
                doSequence(observer, arr, ++idx);
            }
        }, 1000);
    };

    const multicastSequenceSubscriber = () => {

        const seq = [1, 2, 3];

        // Keep track of observers (subscribers)
        const observers: Observer<number>[] = [];

        let timeoutId: NodeJS.Timeout;


        // Return the subscriber function (runs when subscribe() is invoked).
        return (observer: Observer<number>) => {
            observers.push(observer);
            // Upon first subscription, start the sequence
            if (observers.length == 1) {
                timeoutId = doSequence({
                    next(val) {
                        observers.forEach(obs => obs.next(val));
                    },
                    error(val) {
                        expect(true).toBeFalsy();
                    },
                    complete() {
                        observers.slice(0).forEach(obs => obs.complete());
                    }
                }, seq, 0);
            }

            return {
                unsubscribe() {
                    // Remove this observer from observers array so it's no
                    // longer notified.
                    observers.splice(observers.indexOf(observer), 1);
                    if (observers.length === 0) {
                        // No more listeners - clean up.
                        clearTimeout(timeoutId);
                    }
            }}
        };
    };

    const multicastSequence = new Observable(multicastSequenceSubscriber());

    const completed: string[] = [];
    const completeTest = (sub: string): void => {
        completed.push(sub);
        if (completed.length == 2) {
            done();
        }
    };

    //
    // The first subscriber is going to receive all events.
    //
    const resultsFirst: number[] = [];
    multicastSequence.subscribe({
        next(num) { resultsFirst.push(num); },
        complete() {
            expect([1, 2, 3]).toEqual(resultsFirst);
            completeTest("one");
        }
    });

    //
    // The second subscriber, starting a second later, will
    // miss the first event.
    //
    const resultsSecond: number[] = [];
    setTimeout(() => {
        multicastSequence.subscribe({
            next(num) { resultsSecond.push(num); },
            complete() {
                expect([2, 3]).toEqual(resultsSecond);
                completeTest("two");
            }
        });
    }, 1500);


});