import { ArrayValidator } from "./validators/array-validator";
import { BooleanValidator } from "./validators/boolean-validator";
import { NumberValidator } from "./validators/number-validator";
import { ObjectSchemaValidator } from "./validators/object-validator";
import { StringValidator } from "./validators/string-validator";
import { BaseSchema } from "./types";

export const schema = {
  string: () => new StringValidator(),
  number: () => new NumberValidator(),
  boolean: () => new BooleanValidator(),
  array: <T = unknown>(elementValidator?: BaseSchema<T>) => new ArrayValidator<T>(elementValidator),
  object: {
    create: <T extends Record<string, BaseSchema<any>>>(shape: T) =>
      ObjectSchemaValidator.create(shape),
    chain: () => new ObjectSchemaValidator()
  },
};
