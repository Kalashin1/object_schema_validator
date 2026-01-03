import { BaseSchema } from "../types";

export class ArrayValidator<T = unknown> extends BaseSchema<Array<T>> {

  constructor(private elementValidator?: BaseSchema<T>) {
    super()
    this.addValidation((val) => Array.isArray(val), "Value must be an array");
  }

  protected addValidation(
    validation: (value: T[]) => boolean,
    errorMessage: string
  ) {
    this.validations.push(validation);
    this.errorMessages.push(errorMessage);
  }

  min(length: number, errorMessage?: string) {
    this.addValidation(
      (val) => val.length >= length,
      errorMessage || `Must have at least ${length} elements`
    );
    return this;
  }

  max(length: number, errorMessage?: string) {
    this.addValidation(
      (val) => val.length <= length,
      errorMessage || `Must have at most ${length} elements`
    );
    return this;
  }

  exact(length: number, errorMessage?: string) {
    this.addValidation(
      (val) => val.length === length,
      errorMessage || `Must have exactly ${length} elements`
    );
    return this;
  }

  nonempty(errorMessage?: string) {
    return this.min(1, errorMessage || "Cannot be empty");
  }

  unique(errorMessage?: string) {
    this.addValidation((val) => {
      const uniqueSet = new Set(val);
      return uniqueSet.size === val.length;
    }, errorMessage || "All elements must be unique");
    return this;
  }

  of<U extends T>(validator: any): ArrayValidator<U> {
    const newValidator = new ArrayValidator<U>(validator);

    newValidator.validations = [...this.validations];
    newValidator.errorMessages = [...this.errorMessages];

    newValidator.addValidation((val) => {
      if (!validator) return true;
      return val.every((item) => {
        try {
          validator.parse(item);
          return true;
        } catch (error) {
          return false;
        }
      });
    }, "Elements do not match required type");

    return newValidator;
  }

  parse(value: unknown): T[] {
    const result = this.validate(value);
    if (!result.isValid) throw new Error((result.errors as string[]).join(", "));
    if (this.elementValidator) {
      const array = value as T[];
      return array.map((item, index) => {
        try {
          return this.elementValidator!.parse(item);
        } catch (error) {
          throw new Error(`Element at index ${index}: ${error}`);
        }
      });
    }
    return value as T[];
  }
}
