//
// CommonJS (Node.js) module example.
//
// Use a single module.exports function
//
function add(x, y) {
    return x + y;
};

function sub(x, y) {
    return x - y;
};

module.exports = {
    add,
    sub,
    // Aliasing
    addition: add,
    subtraction: sub
};