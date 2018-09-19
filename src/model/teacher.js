//
// Shows inheritance.
//

import Person from "./person";

export default class Teacher extends Person {
    constructor(name, subject, students) {
        //
        // When extending from a base class, you must first call `super` before
        // accessing `this`.
        //
        // Get into the habit of calling super() first within each constructor
        // who's class extends a base class.
        //
        super(name);

        this.subject = subject;
        this.students = students;
    };

    toString() {
        return `${this.name} :: ${super.toString()} with ${this.students.length} students.`;
    }
}
