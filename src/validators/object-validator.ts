import { BaseSchema, Flatten, InferSchema } from "../types";

export class ObjectSchemaValidator<T extends Record<string, any> = {}>
  extends BaseSchema<T>
{
  private shape: { [K in keyof T]: any } = {} as any;

  field<K extends string, V>(
    name: K,
    validator: BaseSchema<V>
  ): ObjectSchemaValidator<T & Record<K, V>> {
    this.shape[name as keyof T] = validator;
    return this as unknown as ObjectSchemaValidator<T & Record<K, V>>;
  }

  static create<T extends Record<string, BaseSchema<any>>>(
    shape: T
  ): ObjectSchemaValidator<{ [K in keyof T]: InferSchema<T[K]> }> {
    // This actually creates an instance
    return new ObjectSchemaValidator().extend(shape);
  }

  extend<S extends Record<string, BaseSchema<any>>>(
    shape: S
  ): ObjectSchemaValidator<T & { [K in keyof S]: InferSchema<S[K]> }> {
    const newShape = { ...this.shape, ...shape };
    const validator = new ObjectSchemaValidator<
      T & {
        [K in keyof S]: InferSchema<S[K]>;
      }
    >();
    (validator as any).shape = newShape;
    return validator;
  }

  validate(value: unknown) {
    const errors: Record<string, string[]> = {};

    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      return {
        isValid: false,
        errors: { root: ["Value must be an object"] },
      };
    }

    const obj = value as Record<string, unknown>;
    let allValid = true;

    for (const [fieldName, validator] of Object.entries(this.shape)) {
      const fieldValue = obj[fieldName];

      if (validator && validator.validate) {
        const result = validator.validate(fieldValue);

        if (!result.isValid) {
          errors[fieldName] = result.errors;
          allValid = false;
        }
      } else if (validator && validator.parse) {
        try {
          validator.parse(fieldValue);
        } catch (error) {
          errors[fieldName] = [String(error)];
          allValid = false;
        }
      }
    }

    return {
      isValid: allValid,
      errors,
    };
  }

  parse(value: unknown): T {
    const result = this.validate(value);

    if (!result.isValid) {
      const errorMessage = Object.entries(result.errors).map(
        ([field, errors]) => `${field}: ${errors.join(", ")}`
      );
      throw new Error(`Validation failed ${errorMessage}`);
    }

    return value as T;
  }

  build(): ObjectSchemaValidator<Flatten<T>> {
    return this as unknown as ObjectSchemaValidator<Flatten<T>>;
  }

  readonly __type?: T;
}