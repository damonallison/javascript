//
// Extending Error allows you to create custom subclasses which behave like
// other Errors, for example they capture stack information.
//
export default class NameError extends Error {
    constructor(reason, name) {
        super(reason);
        this.name = name;
    };
}