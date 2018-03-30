# React Training

* What are the differences between `strict` and `non-strict` mode?

## Dislikes

* `this`
* `var` variable hosting.
* Function parameters do not need to match the function's defined params.

## [ES6 refresher](https://www.youtube.com/watch?v=IEf1KAcK6A8)

* `let` defines a block scope variable.
* `const` defines a const.
* Arrays and dictionaries are reference types.


## Scoping

Hoisting allows you to reference variables which are defined later in the scope.

* Hoisting (does not work with let). You have to declare things before actually using them.


## Arrow Functions

* `this` is handled differently when using arrow functions.
    * With arrow functions, `this` always refers to the context in which the function was defined.
    * In traditional functions, `this` refers to the object which invoked the function (a button or DOM element, for example).

```
// multiline
var fn = (name) => {
    return `Hello ${name}`
}

// If the function is a single statement, you can omit { } and `return`
var fn = (name) => `Hello ${name}`

// if you have a single param, you can omit the () around the argument list
var fn = name => `Hello ${name}`

```
