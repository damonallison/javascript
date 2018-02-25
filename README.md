# Javascript

## Questions

* What is `strict mode` in ES5? Why not *always* use it?
* Is `react-test` compiling down to ES5? Thru `babel`? How to run ES6?
* How does exception handling work in ES6? (`try / catch / throw`)?
  * What are the built in exception types?


## Books

* [Javascript - The Good Parts](http://shop.oreilly.com/product/9780596517748.do)
* [Node.js in Action: Alex R. Young, Bradley Meck, Mike Cantelon, Tim Oxley, Marc Harter, TJ Holowaychuk, Nathan Rajlich: 9781617292576: Amazon.com: Books](https://www.amazon.com/Node-js-Action-Alex-R-Young/dp/1617292575/ref=dp_ob_title_bk)

## Links

* [Mozilla : A re-introduction to Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)
* [ECMAScript Specification](http://www.ecma-international.org/ecma-262/8.0/index.html)

## ECMAScript Versions

### [ES6 (ES2015)](http://www.ecma-international.org/ecma-262/8.0/index.html)

ES6 is the largest update to JS in history. It was the first major release to JS since 2007 (8 years!) It was a multi-year, tumultuous effort which ended up dividing and reuniting the community (google "javascript harmony").

ES6 brings more formality and rigor to the wild, wild west (shit show) that was ES5. Key features include:

* Lexical scoping
* Classes
* Modules
* Promises
* Function definitions - default / variadic arguments
* Cleaner "arrow" function syntax
* Proxies / reflection

> Some of its major enhancements included modules, class declarations, lexical block scoping, iterators and generators, promises for asynchronous programming, destructuring patterns, and proper tail calls.

### Likes

* Functions are first class objects. Closures, HOF, etc.
* Ecosystem. REPL, lightweight tooling.
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

* `strict` and `non strict` mode.
  * You need a different mental model depending if strict mode is enabled or not.
  * Someone realized that JS needed to be controlled, introduced strict mode.
  * ES6 will always apply `use strict` in classes, making it difficult to reason about when strict mode is on/off.

* The meta-programming.
  * Calling functions with `call`, `apply`, and `bind`.
  * The problem is the `this` pointer differs based on how the function is invoked. It's confusing.

* Semicolons are optional but line termination rules could read the program not as intended. Use semicolons.

* Function arguments.
    * Arguments to a function do not have to match the function's declaration.
    * The `arguments` implicit parameter was created to inspect all function parameters passed into a function without having to formally define the parameter.
        * This is confusing to the caller. The caller does not know he can pass additional parameters.
        * `arguments` behaves different in `strict mode`. In `strict mode`, you cannot alter the value of an `arguments` object (`arguments[0] = 'test'`). Without strict mode, you can.
        * `arguments` does not account for default parameters.
        * Use ES6's default parameters and
* Objects
    * `this`
        * Confusing to track what `this` is pointing to.
	    * Dot/bracket notation makes `this` the current object.
	    * If dot notation was *not* used, `this` is the global object. Inner functions need hacks to capture the parent `this` pointer. (`var that = this`)
        * Object creation - calling a function with `new`.

* `var` scoping.
    * Not lexical. `var`, even when defined in a block, is available to the entire function.

* Type cohesion.
  * Strings will coherse when necessary.
  * `parseInt` stops parsing on the first non-numeric character.
	  * `parseInt("20 damon") // 20`


### Javascript. The Language.

#### ES6 Improvements

* Lexical scoping (`let` and `const`).
* Function improvements.
  * `rest` parameters (`...args`). Removes need for `arguments`.
  * Default arguments.
  * Arrow functions. Succinct.

* Supports OOP via prototypal inheritance.
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


-------------------------------------------------------------------------------
-------------------------------------------------------------------------------

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




## Completed Research Materials

* [Mozilla : Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript)
	* Not recommended. Too light, not relevant.
	* A high level JS walk through, all from a DOM manipulation perspective.
	* Is not up to date with ES2015. Inheritance examples were done using prototypal inheritance, which `class` *should* clean up.

* [Read Understanding ECMAScript 6 | Leanpub](https://leanpub.com/understandinges6/read)
