import { expect, test } from "vitest";
//
// An example showing converting an object to / from JSON.
//
test("json", () => {
  // String -> Object
  const json =
    '{"firstName" : "damon", "lastName" : "allison", "kids" : [ {"firstName" : "cole"} ]}';
  const obj = JSON.parse(json);

  expect(obj.firstName).toEqual("damon");
  expect(obj.kids[0].firstName).toEqual("cole");

  // Object -> String
  const str = JSON.stringify(obj);
  expect(str).toMatch(/firstName/); // exact string comparsion not important.
});
