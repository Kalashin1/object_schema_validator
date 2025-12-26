import { schema } from "../schema-builder";

describe("ArrayValidator", () => {
  // Test 1: Basic array validator
  test("it should validate basic array", () => {
    const arraySchema = schema.array();

    expect(arraySchema.parse([1, 2, 3])).toStrictEqual([1, 2, 3]);
    expect(arraySchema.parse(["one", "gold"])).toStrictEqual(["one", "gold"]);

    expect(() => arraySchema.parse("one")).toThrow();
    expect(() => arraySchema.parse(1)).toThrow();
    expect(() => arraySchema.parse({})).toThrow();
  });

  // Test 2: Validate minimum array length
  test("it should validate minimum array length", () => {
    const arraySchema = schema.array().min(1);

    expect(arraySchema.parse([1])).toStrictEqual([1]);
    expect(arraySchema.validate([2, 4]).isValid).toBe(true);

    expect(() => arraySchema.parse([])).toThrow();
  });

  // Test 3: Validate maximum array length
  test("it should validate maximum array length", () => {
    const arraySchema = schema.array().max(3);

    expect(arraySchema.parse([0, 1, 2])).toStrictEqual([0, 1, 2]);
    expect(arraySchema.validate([1, 2, 3]).isValid).toBe(true);

    expect(() => arraySchema.parse([0, 1, 2, 4])).toThrow();
  });

  // Test 4: Validate actual array length
  test("it should validate actual array length", () => {
    const arraySchema = schema.array().exact(3);

    expect(arraySchema.parse([0, 1, 2])).toStrictEqual([0, 1, 2]);
    expect(arraySchema.validate([1, 2, 3]).isValid).toBe(true);

    expect(() => arraySchema.parse([0, 1, 2, 4])).toThrow();
  });

  // Test 5: Validate non empty array
  test("it should validate non empty array", () => {
    const arraySchema = schema.array().nonempty();

    expect(arraySchema.parse([0, 1, 2])).toStrictEqual([0, 1, 2]);
    expect(arraySchema.validate([1]).isValid).toBe(true);

    expect(() => arraySchema.parse([])).toThrow();
  });

  // Test 6: Validate unique values
  test("it should validate unique array values", () => {
    const arraySchema = schema.array().unique();

    expect(arraySchema.parse([0, 1, 2])).toStrictEqual([0, 1, 2]);

    expect(() => arraySchema.parse([0, 0, 2, 2])).toThrow();
  });

  // Test 7: custom array element validator
  test("it should validate with custom validator", () => {
    const arraySchema = schema.array().of(schema.number().min(1));

    expect(arraySchema.parse([3, 2, 5])).toStrictEqual([3, 2, 5]);

    expect(() => arraySchema.parse([0, 1, 2])).toThrow();
  });

  test("it should validate an array of custom", () => {
    const arraySchema = schema
      .array()
      .of(schema.object.create({ name: schema.string().min(3) }));

    expect(arraySchema.parse([{ name: "Sam" }, { name: "Joe" }])).toStrictEqual(
      [{ name: "Sam" }, { name: "Joe" }]
    );

    expect(() => arraySchema.parse([{name: "Xi"}])).toThrow();
  });
});
