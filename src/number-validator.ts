import { BaseSchema } from "./types";

export class NumberValidator implements BaseSchema<number> {
  private validations: Array<(value: number) => boolean> = [];
  private errorMessages: string[] = [];

  constructor() {
    this.addValidation(
      (val) => typeof val === "number" && !isNaN(val),
      "Value must be a number"
    );
  }

  private addValidation(
    validation: (value: number) => boolean,
    errorMessage: string
  ): void {
    this.validations.push(validation);
    this.errorMessages.push(errorMessage);
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

  even(errorMessage?: string) {
    this.addValidation((val) => val % 2 === 0, errorMessage || "Must be even");
    return this;
  }

  odd(errorMessage?: string) {
    this.addValidation((val) => val % 2 !== 0, errorMessage || "Must be odd");
  }

  validate(value: unknown) {
    const errors: string[] = [];

    for (let i = 0; i < this.validations.length; i++) {
      const validation = this.validations[i];
      const errorMsg = this.errorMessages[i];

      try {
        if (!validation(value as number)) errors.push(errorMsg);
      } catch (error) {
        errors.push(`Validation error: ${error}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  parse(value: unknown) {
    const result = this.validate(value);
    if (!result.isValid) throw new Error(result.errors.join(", "));
    return value as number;
  }
}
