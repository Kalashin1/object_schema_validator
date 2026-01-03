import { ObjectSchemaValidator } from "./validators/object-validator";

interface IBaseSchema<T> {
  parse(value: unknown): T;
  validate(value: unknown): {
    isValid: boolean;
    errors: string[] | Record<string, string[]>;
  };
}

export abstract class BaseSchema<T> implements IBaseSchema<T> {
  protected validations: Array<(value: T) => boolean> = [];
  protected errorMessages: string[] = [];

  parse(value: unknown) {
    const result = this.validate(value);
    if (!result.isValid)
      throw new Error((result.errors as string[]).join(", "));
    return value as T;
  }

  protected addValidation(
    validation: (value: T) => boolean,
    errorMessage: string
  ) {
    this.validations.push(validation);
    this.errorMessages.push(errorMessage);
  }

  validate(value: unknown): {
    isValid: boolean;
    errors: string[] | Record<string, string[]>;
  } {
    const errors: string[] = [];

    for (let i = 0; i < this.validations.length; i++) {
      const validation = this.validations[i];
      const errorMsg = this.errorMessages[i];

      try {
        if (!validation(value as T)) errors.push(errorMsg);
      } catch (error) {
        errors.push(`Validation error: ${error}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
  readonly __type?: T;
}

export type Flatten<T> = {} & { [K in keyof T]: T[K] };

export type InferSchema<T> = T extends BaseSchema<infer U> ? U : never;

export type Infer<T> = T extends ObjectSchemaValidator<infer U>
  ? { [K in keyof U]: U[K] } // This flattens it
  : never;
