export interface BaseSchema<T> {
  parse(value: unknown): T;
  validate(value: unknown): {
    isValid: boolean;
    errors: string[] | Record<string, string[]>;
  };
}

export type SchemaType<T> = T extends BaseSchema<infer U> ? U : never;
export type InferObjectType<Shape extends Record<string, BaseSchema<any>>> = {
  [K in keyof Shape]: SchemaType<Shape[K]>;
};