# Javascript

This project contains tests which highlight ES6 features.

## Quick Start

* All tests are in the `__tests__` folder. The tests are written using [jest](https://facebook.github.io/jest/)

```
$ npm install
$ npm test
```

## Questions

* Is `react-test` compiling down to ES5? Thru `babel`? How to run ES6 without compiling down to ES5?
* How does exception handling work in ES6? (`try / catch / throw`)?
  * What are the built in exception types?
* What are the built in functions?

## Books

* [Javascript - The Good Parts](http://shop.oreilly.com/product/9780596517748.do) - Douglas Crockford

* [Effective Javascript](https://www.amazon.com/Effective-JavaScript-Specific-Software-Development/dp/0321812182) - David Herman

* [Node.js in Action](https://www.amazon.com/Node-js-Action-Alex-R-Young/dp/1617292575/ref=dp_ob_title_bk) - Alex R. Young, Bradley Meck, Mike Cantelon, Tim Oxley, Marc Harter, TJ Holowaychuk, Nathan Rajlich

### Completed Research Materials

* [Mozilla : Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
	* Not recommended. Too light, not relevant.
	* A high level JS walk through, all from a DOM manipulation perspective.
	* Is not up to date with ES2015. Inheritance examples were done using prototypal inheritance, which `class` *should* clean up.

* [Read Understanding ECMAScript 6 | Leanpub](https://leanpub.com/understandinges6/read)


## Links

* [Mozilla : A re-introduction to Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)

* [ECMAScript Specification](http://www.ecma-international.org/ecma-262/8.0/index.html)

## ECMAScript Versions

### ES5 (2009)

The goal of ES5 was to codify the de-facto interpretations of JS that had already been added to browsers. The spec was catching up to the industry.

* Accessor properties
* Reflective creation and inspection of objects
* Additional array manipulation functions
* JSON
* Strict mode

### ES6 (ES 2015)

[ES6 (ES2015)](http://www.ecma-international.org/ecma-262/6.0/index.html)

ES6 was the largest update to JS in history. It was the first major release to JS since ES5 in 2009. It was a multi-year, tumultuous effort which ended up dividing and reuniting the community (google "javascript harmony"). Many of the ES6 features were developed for ES4 - which was never released.

The goals of ES6 were centered around support for larger applications and better project structure.

* Lexical (block) scoping with (`let`).
  * Don't ever use `var`. Use `let`, which is truly lexically scoped.
* `const`
* Classes
* Modules
* Iterators / generators
* Promises
* Function definitions - default / variadic arguments
* Cleaner "arrow" function syntax
* Proxies / reflection
* Maps / sets

> Some of its major enhancements included modules, class declarations, lexical block scoping, iterators and generators, promises for asynchronous programming, destructuring patterns, and proper tail calls.

### ECMAScript 2016

[ECMAScript 2016](http://www.ecma-international.org/ecma-262/7.0/index.html)

ECMAScript was the first release under TC39's yearly release cadence and open development process.

### ECMAScript 2017 | 2018 | 2019

I'm not quite sure what happened between 2017, 2018, and 2019. All of the specs look identical. Here is the 2019 version.

* [ECMAScript 2018](http://www.ecma-international.org/ecma-262/8.0/index.html)

### ECMAScript 2019

* [ECMAScript 2019](https://tc39.github.io/ecma262/)

* Async functions
* Shared Memory
* Atomics

---

### Likes

* Development ecosystem speed. REPL, lightweight tooling.
* Functions are first class objects. Closures, HOF, etc.
* ES6 drastically cleaned up the language.
    * String interoplation.
    * Lexical scoping with `let` and `const`, block level functions.
    * Functions.
      * default parameters and `rest` parameters makes `arguments` irrelevant.
      * default parameter expressions (`function func(x = getValue()) {}`)
    * Objects
      * Introduction of the `super` keyword to invoke methods on an object's prototype.
      * Object destructuring.

### Dislikes

* Dynamic typing.

* Global variables.

* Differing execution contexts. Node, various browsers.

* Type cohesion.
  * Different cohesion rules apply for equality operators (`==`) than inequality operators (`<` or `>`).


* `strict` and `non strict` mode.
  * You need a different mental model depending if strict mode is enabled or not.
  * Someone realized that JS needed to be controlled, introduced strict mode.
  * ES6 will always apply `use strict` in classes, making it difficult to reason about when strict mode is on/off.

* Function arguments.
    * Arguments passed to a function do not have to match the function's declaration.
    * The `arguments` implicit parameter was created to inspect all function parameters passed into a function without having to formally define the parameter.
        * This is confusing to the caller. The caller does not know he can pass additional parameters.
        * `arguments` behaves different in `strict mode`. In `strict mode`, you cannot alter the value of an `arguments` object (`arguments[0] = 'test'`). Without strict mode, you can.
        * `arguments` does not account for default parameters.
        * Use ES6's default parameters.

* Calling functions with `call`, `apply`, and `bind`.
  * `this` differs based on how the function is invoked.

* `this`
  * `this` depends on how the function was invoked. `this` could be different for each function invocation.
  * Confusing to track what `this` is pointing to.
  * Dot/bracket notation makes `this` the current object.
  * If dot notation was *not* used, `this` is the global object. Inner functions need hacks to capture the parent `this` pointer. (`var that = this`)
* Object creation - calling a function with `new`.

* Scoping
  * `var` scoping is not lexical. `var`, even when defined in a block, is available to the entire function.

* Type cohesion.
  * Strings will coherse when necessary.
  * `parseInt` stops parsing on the first non-numeric character.
	  * `parseInt("20 damon") // 20`


---

## ECMAScript Specification Notes

### 4. Overview

The spec authors describe ES as an "object oriented" language first and foremost. Taking queues from C, Java, Self, and Scheme. Interesting they describe it as OO given classes are syntactic sugar around prototypal inheritance.

Objects in the ES sense are property maps.

```
{
  "firstName" : "damon",
  "lastName" : "allison"
}
```

Properties can hold other objects, primitive values, or functions.

Primitive types include:
* Undefined
* Null
* Boolean
* Number
* String
* Symbol

ECMAScript 2015 introduced `class` definitions which are syntactic sugar around ES's prototypal inheritance.

Each `constructor` is a function that has a propery named `prototype` that is used to implement `prototype based inheritance`. 

### Strict Mode

Strict mode represents the future direction of ES. Always use strict mode.

(NOTE: These rules were not taken from the ECMA spec. They were written down as they were found).

* Variable references
  * Strict mode: Reference errors are thrown trying to access a variable that does not exist.
  * Sloppy mode: A variable is created at the global scope when first referenced.

* `arguments`
  * Strict mode: The `arguments` implicit parameter cannot be altered.
  * Sloppy mode: The `arguments` implicit parameter can be altered. (e.g., arguments[0] = `new value`).

* `this`
  * Strict mode: Functions declared in the global scope have `this === undefined`.
  * Sloppy mode: Functions declared in the global scope have `this === global`.

* In ES6, `class` always runs in strict mode.

---

#### ES6 Improvements

* Lexical scoping (`let` and `const`).
* Function improvements.
  * `rest` parameters (`...args`). Removes need for `arguments`.
  * Default arguments.
  * Arrow functions. Succinct.

* Types
	* `Number`, `String`, `Boolean`, `Function`, `Object`, `Symbol`

* Numbers
  * All numbers are 64 bit floats.
  * `parseInt("99", 10); // convert to int`
  * `isNaN(val)` will check for `NaN`.
  * `null` : a value which must be deliberately set.
  * `undefined` : an uninitialized value.
  * `falsy` values are `false`, `0`, `""`, `NaN`, `null`, `undefined`

* Variables
  * `let` : block scoped (lexically scoped).
```
  for (let var = 0; var < 5; var++) {
    // var visible in the `for` block only.
  }
```
  * `const` : immutable. Block scoped.
  * `var` : mutable. Function scoped.

* Arrays
  * `length` is always 1 higher **than the highest index**. Not the number of elements. WTF.

```
  var a = ['dog', 'cat', 'bird']
  a[100] = 'test'
  a.length // => 101

  a.forEach(function(val, index, arr) {
    // do something with the current value or arr[index]
  })
```

## Tools

* `ncu` (`npm-check-update`)
  * Allows you to upgrade all project dependencies via one command line.
  * Run `ncu` in your project root to determine which dependencies are out of sync.


## Guidance (The Good Parts)

* Write in a functional style. 
* Don't use `var` or depend on global scope.
* Declare all variables using `let` or `const`.
* Put all objects into a single global object for your app. This avoids collisions with globals from other apps.

* JS's implementation of functions is well done. First class, very functional language. 
  * Support for inner functions, closures.

* `this` and the function invocation pattern
  * Method. `this` is bound to the object on which the method is attached.
  * Defau. When a function is not bound to an object, including inner functions, `this` is bound to the global object.
  * Constructor
  * Apply


---

## Javascript : The Good Parts

* Crockford prefers dynamic typing. Why?
	* Strong typing doesn't catch the hard, logical errors.
	* Strong testing is still needed.
	* Don't need to fight the type system.
* JSON is flexible.
* Prototypal inheritance. Confusing to OO developers.
* Massive design flaw: global. All top level variables are out into the "global object".
* JS is more like Lisp than Java.

## YDKJS

### Book 1: Up and Going

* Great passion for learning JS, deeply understanding, not avoiding, the "hard parts".
* He really takes aim at Crockford's position of avoiding the hard parts. He's taking 
  the position of learning and embracing the hard parts.
* He's sympathetic to JS, doesn't call out JS's flaws - like it's type cohecion rules or 
  hard to remember gotchas (parameters don't have to match function declaration), 
  variable hoisting, `this`, etc. He goes out of his way to *defend* JS's nightmarish 
  type coercion, scoping complexity.
* He's very "anti class, anti OO". He recommends thinking in terms of prototype and delegation. 
  * Prototype delegation may be the ES5 way of doing things, however ES6 added `class` and appears
    to be moving into the OO direction.
* The books were written as ES6 was completing. They should be updated for ES6 only.

### Book 2: Scopes and Closures

* The book starts off explaining how a compiler lexes, parses, and executes javascript. That isn't needed.
* Javascript's scoping rules are complex and riddled with leaks. 
* Javascript is lexically scoped. `eval` and `with` can circumvent.
* Javascript is based on global scope. Modules cannot alter the global scope. You must specifically import identifiers into scope.
* He takes the stance that we "should know and use all javascript features to 
  produce more readable / maintainable code" - but using all of the "hard parts"
  of the language requires you to remember javascript's isoteric and easy to forget
  "features". For example,`let` and `const` should replace `var`, however he claims
  that you should continue to use `var` when appropriate. That requires mental
  overhead that we shouldn't need to remember (hoisting).
* The examples in `scopes and closures` use `var` everywhere. He should use `let`
  or at least *mention* that `let` and `const` are preferred.

### Book 3: this & Object Prototypes

* The forward and chapter 1 both downplay `this` and it's complexity. The truth is:
  * `this` is much more complex than other languages.
  * Making `this` an implicit function parameter is sold as "cleaner code". Bullshit.
    You're now relying on implicit state which is not part of the  function's definition.

* He claims that Javascript's complexities are easy to understand, that nobody takes
  the time to understand them. That may indeed be true, but it's not the entire story.
  Javascript truly has a lot of "bad parts" that, when all added up, amount to a lot of
  unnecessary mental overhead.

* You can force `this` to be set to an object by using `call`. The first parameters to `call` will be `this` in the called function.

```javascript

let f = (a) => console.log(this);
f.call(this, arg);

```

* `this` has nothing to do with lexical scope. `this` is completely determined based on how a function is called.


Arrow functions have `this` bound to their lexical scope value (bravo!)

```javascript

var obj = {
  count: 2,
  cool: () => {
    console.log(`count == ${this.count}`)
  }
}

```


* `this` has nothing to do with the function's scope or lexical scope at all. It is simply a pointer to an object based on how the function is invoked.

#### Classes

The book explains how linking objects via prototypes, not classes, is less mentally confusing than using classes.

With ES6 (and React), `class` wins. So regardless of what the author thinks, using prototypes and delegation lost to classes. While this book may be great for JS purists, it is not aging well.

```javascript

let Controller {
  user: "damon",
  errors: [],
  getUser() {
    return user;
  }
};

let AuthController = Object.Create(Controller);

AuthController.login = function(pass) {
  console.log(`logging in ${super.user} with pass ${pass}`);
}

```

### Book 4: Types & Grammar

