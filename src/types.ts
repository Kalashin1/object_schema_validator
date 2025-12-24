import { ObjectSchemaValidator } from "./validators/object-validator";

interface IBaseSchema<T> {
  parse(value: unknown): T;
  validate(value: unknown): {
    isValid: boolean;
    errors: string[] | Record<string, string[]>;
  };
}

export abstract class BaseSchema<T> implements IBaseSchema<T> {
  parse(value: unknown): T {
    throw new Error("Method not implemented.");
  }
  validate(value: unknown): {
    isValid: boolean;
    errors: string[] | Record<string, string[]>;
  } {
    throw new Error("Method not implemented.");
  }
  readonly __type?: T
}

export type Flatten<T> = {} & { [K in keyof T]: T[K] };

export type InferSchema<T> = T extends BaseSchema<infer U> ? U : never;

export type Infer<T> = T extends ObjectSchemaValidator<infer U>
  ? { [K in keyof U]: U[K] } // This flattens it
  : never;
