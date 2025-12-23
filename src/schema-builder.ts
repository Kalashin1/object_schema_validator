import { ArrayValidator } from "./array-validator";
import { BooleanValidator } from "./boolean-validator";
import { NumberValidator } from "./number-validator";
import { ObjectSchemaValidator } from "./object-validator";
import { StringValidator } from "./string-validator";
import { BaseSchema, InferObjectType } from "./types";

export const schema = {
  string: () => new StringValidator(),
  number: () => new NumberValidator(),
  boolean: () => new BooleanValidator(),
  array: () => new ArrayValidator(),
  object: <T extends Record<string, any> = {}>() =>
    new ObjectSchemaValidator<T>(),
};
