import { BaseSchema } from "../types"

export class BooleanValidator extends BaseSchema<boolean> {

  constructor(){
    super();
    this.addValidation(
      (val) => typeof val === 'boolean',
      'Value must be a boolean'
    )
  }

  true(errorMessage?: string) {
    this.addValidation(
      (val) => val === true,
      errorMessage || 'Must be true'
    )
    return this;
  }

  false(errorMessage?: string) {
    this.addValidation(
      (val) => val === false,
      errorMessage || 'Must be false'
    )
    return this;
  }
}