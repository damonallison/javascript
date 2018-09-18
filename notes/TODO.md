# Javascript TODO

## You Don't Know JS

### ES6 & Beyond

* Chapter 3: Organization
  * Iterators / Generators
  * Modules
* Chapter 4: Async Control Flow
  * Promises
* Chapter 5: Collections
  * Map / WeakMap
  * Set / WeakSet
* Chapter 6: API Additions
  * Array API
  * Object
  * String
* Chapter 7: Metaprogramming
  * Special symbols
  * Proxies
  * Reflection
* Chapter 8: Beyond ES6
  * Async
  * Web Assembly

## Tests

## Language

* State of ES6: are all relevant browsers (n-1 for evergreen, IE11) fully support ES6?
* Constructor functions.
* Adding methods to objects - understanding `prototype` and `this`.
* `Object.prototype` available functions. Metaprogramming.
* Do classes in JS provide any encapsulation?
* Modules : what is the difference between `require` and `import`?
* Exception handling.

## Libraries

* ES6 built-ins. Including "native" types (`String`, `Boolean`, etc).
* `lodash`: part of the standard library that should be incuded in JS.
* Library to check for array equality.
* What are the built in functions / native environment?

## v8

* v8 - JIT compilation, execution, relationship to Node.

## Tools

### Environment

* npm
* nvm : node version manager.
* ncu : npm-check-updates

### Package Managers

* What is the difference between `npm` and `yarn`? Can we just use `npm`?

* npm
* yarn
* webpack
* babel

### Task Runners

Task runners automate testing, CSS minification, transpiling (babel), packaging, etc.

* Grunt - old school. Config file based. Mindshare moved to `gulp`.
* Gulp - successor to Grunt. Cleaner setup. Code over configuration. Streams based.

### Unit Testing

* jasmine / karma
* Selenium / protractor

### Node

* What is the node environment? What is the top level (host) object? How does it compare to a browser?
* What functions does the host environment have on it?

### Typescript

* Why did the VS Code team choose TypeScript?
  * What do they think of it? Good results?

### npm

* Local file system environment.
* `package.json`: scripts and semver.
* Transpilers: Babel (Facebook) vs. Traceur (Google)
  * What is the current state of transpilers?

### React

* Is `react-test` compiling down to ES5? Thru `babel`? How to run ES6 without compiling down to ES5?
