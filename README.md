# Javascript

This project contains tests which highlight ES6 features.

## Quick Start

* All tests are in the `__tests__` folder. The tests are written using [jest](https://facebook.github.io/jest/)

```
$ npm install
$ npm test
```

## Questions

* What is `strict mode` in ES5? Why not *always* use it?
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

* `strict` and `non strict` mode.
  * You need a different mental model depending if strict mode is enabled or not.
  * Someone realized that JS needed to be controlled, introduced strict mode.
  * ES6 will always apply `use strict` in classes, making it difficult to reason about when strict mode is on/off.

* The meta-programming.
  * Calling functions with `call`, `apply`, and `bind`.
  * The problem is the `this` pointer differs based on how the function is invoked. It's confusing.

* Semicolons are *optional* but line termination rules could read the program not as intended. **Use semicolons.**

* Function arguments.
    * Arguments to a function do not have to match the function's declaration.
    * The `arguments` implicit parameter was created to inspect all function parameters passed into a function without having to formally define the parameter.
        * This is confusing to the caller. The caller does not know he can pass additional parameters.
        * `arguments` behaves different in `strict mode`. In `strict mode`, you cannot alter the value of an `arguments` object (`arguments[0] = 'test'`). Without strict mode, you can.
        * `arguments` does not account for default parameters.
        * Use ES6's default parameters.
* Objects
    * `this`
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

ES intentionally resembles Java syntax. ES is relaxed to enable it to serve as an easy-to-use scripting language. 

* Variables do not have to have it's type declared.
* Types are not associated with properties.
* Properties can be added to objects dynamically by assigning values to them.
* Constructors are not required to name or assign values to all or any of the object's properties.

ECMAScript 2015 introduced `class` definitions which are syntactic sugar around ES's prototypal inheritance.

Each `constructor` is a function that has a propery named `prototype` that is used to implement `prototype based inheritance`. 

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

* Equality
  * `==` Type cohesion will occur with different types.
    * `123 == '123' // => true`
  * `===` No type cohesion.

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



## Javascript : The Good Parts

* Crockford prefers dynamic typing. Why?
	* Strong typing doesn't catch the hard, logical errors.
	* Strong testing is still needed.
	* Don't need to fight the type system.
* JSON is flexible.
* Prototypal inheritance. Confusing to OO developers.
* All top level variables are out into the "global object".
* JS is more like Lisp than Java.

### Language

* Only a single number type.
* `NaN` is not equal to any number, including itself.
* `string`s are immutable.
* Use `typeof` to determine type.
	* `typeof flight.num === 'number'`
* Put all objects into a single global object for your app. This avoids collisions with globals from other apps.
* JS's implementation of functions is well done. First class, very functional language.
	* Inner functions.
	* Closures.
* `this` and the function invocation pattern
	* Method. `this` is bound to the object on which the method is attached.
	* Function. When a function is not bound to an object, including inner functions, `this` is bound to the global object.
	* Constructor
	* Apply





