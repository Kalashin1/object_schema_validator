import { BaseSchema } from "../types";

export class NumberValidator extends BaseSchema<number> {
  constructor() {
    super();
    this.addValidation(
      (val) => typeof val === "number" && !isNaN(val),
      "Value must be a number"
    );
  }
  
  min(minValue: number, errorMessage?: string): this {
    this.addValidation(
      (val) => val >= minValue,
      errorMessage || `Must be at least ${minValue}`
    );
    return this;
  }

  max(maxValue: number, errorMessage?: string): this {
    this.addValidation(
      (val) => val <= maxValue,
      errorMessage || `Must be at least ${maxValue}`
    );
    return this;
  }

  int(errorMessage?: string): this {
    this.addValidation(
      (val) => Number.isInteger(val),
      errorMessage || `Must be an integer`
    );
    return this;
  }

  actual(value: number, errorMessage?: string): this {
    this.addValidation(
      (val) => val === value,
      errorMessage || `${value} does not match expected`
    )
    return this;
  }

  even(errorMessage?: string) {
    this.addValidation((val) => val % 2 === 0, errorMessage || "Must be even");
    return this;
  }

  odd(errorMessage?: string) {
    this.addValidation((val) => val % 2 !== 0, errorMessage || "Must be odd");
    return this;
  }
}
