export class StringValidator {
  private validations: Array<(value: string) => boolean> = [];
  private errorMessages: string[] = [];

  constructor() {
    this.addValidation(
      (val) => typeof val === "string",
      "Value must be a string"
    );
  }

  private addValidation(
    validation: (value: string) => boolean,
    errorMessage: string
  ): void {
    this.validations.push(validation);
    this.errorMessages.push(errorMessage);
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
      errorMessage || `String must be at most ${length} characters`
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

  url(errorMessage?: string): this {
    return this.regex(
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
      errorMessage || "Invalid URL format"
    );
  }
  
  validate(value: unknown): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    for(let i = 0; i < this.validations.length; i++){
      const validation = this.validations[i];
      const errorMsg = this.errorMessages[i];


      try {
        if (!validation(value as string)) 
          errors.push(errorMsg)
      } catch (error) {
        errors.push(`Validation error: ${error}`)
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  parse(value: unknown): string {
    const result = this.validate(value);
    if (!result.isValid)
      throw new Error(result.errors.join(', '))
    return value as string;
  }
}
