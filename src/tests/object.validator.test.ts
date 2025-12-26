import { schema } from "../schema-builder";

describe("ObjectValidator", () => {
  // Test 1: Basic Object validation
  test("it should validate a basic object", () => {
    const objectSchema = schema.object.create({ name: schema.string() });

    expect(
      objectSchema.parse({ name: "Sam" })
    ).toStrictEqual({ name: "Sam" });
    expect(
      objectSchema.validate({name: "Joe"}).isValid
    ).toBe(true)

    expect(
      () => objectSchema.parse("name")
    ).toThrow()

  });

  // Test 2: It should validate chained object
  test("it should validate chained object", () => {
    const objectSchema = schema.object.chain().field("name", schema.string()).build()

    expect(objectSchema.parse({name: "Jon"})).toStrictEqual({ name: "Jon"})
    expect(objectSchema.validate({name: "Jon"}).isValid).toBe(true)

    expect(() => objectSchema.parse({age: 30})).toThrow();
  })
});
