import { schema } from "./schema-builder";
import { InferSchema } from "./types";

const addressValidator = schema.object.create({
  street: schema.string(),
  zip: schema.string(),
  city: schema.string(),
  state: schema.string(),
  country: schema.string(),
});

const userValidator = schema.object
  .chain()
  .field(
    "username",
    schema
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z]/)
  )
  .field("email", schema.string().email())
  .field("address", addressValidator)
  .build();

const userArrays = schema.array(userValidator)

const bookValidator = schema.object.create({
  name: schema.string().min(5).max(50),
  pages: schema.number(),
  isPublished: schema.boolean(),
  author: userValidator,
  readers: schema.array(userValidator)
});

type User = InferSchema<typeof userValidator>;
type Book = typeof bookValidator.__type;
type Address = InferSchema<typeof addressValidator>


const user:User = {
  email: "kinaneesamsonjohn@gmail.com",
  username: "kalashin",
  address: {
    city: "Manhattan",
    country: "USA",
    state: "NY",
    street: "13 Abbey Avenue",
    zip: "500103"
  }
}

console.log(userValidator.parse(user))