import { schema } from "../schema-builder";

describe("NumberValidator", () => {
  // Test 1: Basic number Validation
  test("should validate number type", () => {
    const numberSchema = schema.number()

    expect(numberSchema.parse(123)).toBe(123)
    expect(numberSchema.validate(10).isValid).toBe(true)

    expect(() => numberSchema.parse("123")).toThrow()
    expect(() => numberSchema.parse(undefined)).toThrow()
    expect(() => numberSchema.parse(null)).toThrow()
    expect(() => numberSchema.parse({})).toThrow()
  })

  // Test 2: minimum number validation
  test("should validate minimum number value", () => {
    const numberSchema = schema.number().min(3)


    expect(numberSchema.parse(10)).toBe(10)
    expect(numberSchema.validate(5).isValid).toBe(true)

    expect(() => numberSchema.parse(2)).toThrow()
    expect(() => numberSchema.parse(1)).toThrow()
  })

  // Test 3: maximum number validation
  test("should validate maximum number value", () => {
    const numberSchema = schema.number().max(50)

    expect(numberSchema.parse(10)).toBe(10)
    expect(numberSchema.validate(30).isValid).toBe(true)

    expect(() => numberSchema.parse(70)).toThrow()
    expect(() => numberSchema.parse(100)).toThrow()
  })

  // Test 4: actual number validation
  test("should be actual value", () => {
    const numberSchema = schema.number().actual(10);

    expect(numberSchema.parse(10)).toBe(10)
    
    expect(() => numberSchema.parse(30)).toThrow()
    expect(() => numberSchema.parse(90)).toThrow()
  })

  // test 5: Odd number validation
  test("should validate odd numbers", () => {
    const numberSchema = schema.number().odd()
    
    expect(numberSchema.parse(9)).toBe(9)
    expect(numberSchema.parse(11)).toBe(11)

    expect(() => numberSchema.parse(10)).toThrow()
    expect(() => numberSchema.parse(30)).toThrow()
  })

  // test 6: Integer number validation
  test("should validate an integer", () => {
    const numberSchema = schema.number().int()

    expect(numberSchema.parse(10)).toBe(10);
    expect(numberSchema.parse(5)).toBe(5)

    expect(() => numberSchema.parse(10.5)).toThrow()
    expect(() => numberSchema.parse(5.5)).toThrow()
  })
})