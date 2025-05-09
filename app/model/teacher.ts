//
// Shows inheritance.
//

import Person from "./person";

export default class Teacher extends Person {
  private readonly subject: string;
  private students: Person[];

  constructor(name: string, subject: string, students: Person[]) {
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
  }

  toString() {
    return `${this.capitalizedName} :: ${super.toString()} teaches '${
      this.subject
    }' to ${this.students.length} students.`;
  }
}
