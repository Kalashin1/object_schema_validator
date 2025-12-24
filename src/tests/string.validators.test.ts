import { schema } from "../schema-builder";

describe("StringValidator", () => {
  // Test 1. Basic String Validation
  test("should validate string type", () => {
    const stringSchema = schema.string();

    expect(stringSchema.parse("hello")).toBe("hello") 

    expect(() => stringSchema.parse(123)).toThrow()
    expect(() => stringSchema.parse(null)).toThrow()
    expect(() => stringSchema.parse(undefined)).toThrow()
    expect(() => stringSchema.parse({})).toThrow()
  })

  // Test 2. Test min string length validation
  test("should validate minimum length", () => {
    const stringSchema = schema.string().min(3)

    expect(stringSchema.parse("abc")).toBe("abc");
    expect(stringSchema.parse("abcd")).toBe("abcd");

    expect(() => stringSchema.parse("ab")).toThrow();
    expect(() => stringSchema.parse("")).toThrow();
  })
  
  // Test 3. Test max string length validation
  test("should validate maximum length", () => {
    const stringSchema = schema.string().max(5)

    expect(stringSchema.parse("abcd")).toBe("abcd")
    expect(stringSchema.parse("abcde")).toBe("abcde")

    expect(() => stringSchema.parse("abcdef")).toThrow()
    expect(() => stringSchema.parse("qrstuv")).toThrow()
  })
  
  // Test 4. Test email validation
  test("should validate email", () => {
    const stringSchema = schema.string().email()

    expect(stringSchema.parse("sam@gmail.com")).toBe("sam@gmail.com")
    expect(stringSchema.parse("fred@gmail.com")).toBe("fred@gmail.com")

    expect(() => stringSchema.parse("sam.com")).toThrow()
    expect(() => stringSchema.parse("fred@gmail")).toThrow()
  })
})