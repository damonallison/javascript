/**
 * Typescript
 *
 * Typescript is a structural type system. When comparing two types, regardless
 * of where they came from, if the types of all members are compatible, the
 * types are compatible.
 *
 * Private / Protected members must be Private / Protected within both types.
 *
 * Classes
 *
 * Access modifiers : private, protected, public (default)
 * Readonly : Must be initialized at declaration or in constructor.
 */

class Animal {
    readonly numberOfLegs: number = 4;

    /**
     * Parameter Properties
     *
     * Parameters can be turned into class properties by prefixing a constructor
     * parameter with an accessibility modifier. Readonly can be applied at any
     * accessibility level. (By default, readonly will be public).
     *
     * readonly
     * private, public, protected
     *
     * @param name the animal's name
     */
    constructor(private name: string) {
        this.name = name;
    }

    get myName(): string {
        return this.name;
    }
    set myName(val: string) {
        this.name = val;
    }
}