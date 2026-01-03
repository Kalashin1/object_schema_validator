import { BaseSchema } from "../types";

export class StringValidator extends BaseSchema<string> {

  constructor() {
    super();
    this.addValidation(
      (val) => typeof val === "string",
      "Value must be a string"
    );
  }

  regex(pattern: RegExp, errorMessage?: string): this {
    this.addValidation(
      (val) => pattern.test(val),
      errorMessage || `String must match pattern: ${pattern}`
    );
    return this;
  }

  min(length: number, errorMessage?: string): this {
    this.addValidation(
      (val) => val.length >= length,
      errorMessage || `String must be at least ${length} characters`
    );
    return this;
  }

  max(length: number, errorMessage?: string): this {
    this.addValidation(
      (val) => val.length <= length,
      errorMessage || `String must be at most ${length} characters`
    );
    return this;
  }

  nonempty(errorMessage?: string): this {
    return this.min(1, errorMessage || "Cannot be empty");
  }

  exact(length: number, errorMessage?: string): this {
    this.addValidation(
      (val) => val.length === length,
      errorMessage || `Must be exactly ${length} characters`
    );
    return this;
  }

  email(errorMessage?: string): this {
    return this.regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessage || "Invalid email format"
    );
  }

  date(errorMessage?: string): this {
    return this.regex(
      /^\d{4}-\d{2}-\d{2}T/,
      errorMessage || "Invalid date format"
    );
  }

  uuid(errorMessage?: string): this {
    return this.regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      errorMessage || "Invalid UUID format"
    );
  }

  phone(errorMessage?: string): this {
    return this.regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      errorMessage || "Invalid phone number format"
    );
  }

  alphanumeric(errorMessage?: string): this {
    return this.regex(
      /^[a-zA-Z0-9]+$/,
      errorMessage || "Must contain only letters and numbers"
    );
  }

  url(errorMessage?: string): this {
    return this.regex(
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      errorMessage || "Invalid URL format"
    );
  }
}
