import { schema } from "../schema-builder";

describe("BooleanValidator", () => {
  
  // test 1: Basic boolean validation
  test("it should boolean type", () => {
    const booleanValidator = schema.boolean()

    expect(booleanValidator.parse(true)).toBe(true);
    expect(booleanValidator.parse(false)).toBe(false);

    expect(() => booleanValidator.parse("10")).toThrow()
    expect(() => booleanValidator.parse(10)).toThrow()
    expect(() => booleanValidator.parse({})).toThrow()
  })

  // test 2: validate true value
  test("it should validate true", () => {
    const booleanSchema = schema.boolean().true()

    expect(booleanSchema.parse(1 < 2)).toBe(true)
    expect(booleanSchema.parse(2 === 2)).toBe(true)

    expect(() => booleanSchema.parse(2 < 1)).toThrow()
    expect(() => booleanSchema.parse(3 > 4)).toThrow()
  })

  // test 3: validate false value
  test("it should validate false", () => {
    const booleanSchema = schema.boolean().false()

    expect(booleanSchema.parse(1 > 2)).toBe(false)
    expect(booleanSchema.parse(2 < 1)).toBe(false)

    expect(() => booleanSchema.parse(1 === 1)).toThrow()
    expect(() => booleanSchema.parse(1 < 2)).toThrow()
  })
});