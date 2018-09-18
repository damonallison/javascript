//
// CommonJS (Node.js) module example.
//
// * Each js file is a module.
// * Objects / functions / properties are added to the module by adding them to
//   the special `exports` object.
//
function add(x, y) {
    return x + y;
};

function subtract(x, y) {
    return x - y;
};

module.exports = {
    add,
    subtract
};