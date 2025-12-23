import { StringValidator } from "./string-validator";
import { NumberValidator } from "./number-validator";

const stringValidator = new StringValidator();
const numberValidator = new NumberValidator();

const name = stringValidator.min(3).max(10)
const age = numberValidator.min(18).max(50)

console.log(name.validate("Sam"))
console.log(age.validate(30))