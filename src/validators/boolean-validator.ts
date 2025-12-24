import { BaseSchema } from "../types"

export class BooleanValidator extends BaseSchema<boolean> {
  private validations: Array<(value: boolean) => boolean> = []
  private errorMessages: string[] = []

  constructor(){
    super();
    this.addValidation(
      (val) => typeof val === 'boolean',
      'Value must be a boolean'
    )
  }

  private addValidation(validation: (value: boolean) =>boolean, errorMessage: string) {
    this.validations.push(validation)
    this.errorMessages.push(errorMessage)
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

  validate(value: unknown) {
    const errors: string[] = []

    for (let i = 0; i < this.validations.length; i++) {
      const validation = this.validations[i]
      const errorMsg = this.errorMessages[i]

      try {
        if (!validation(value as boolean))
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

  parse(value: unknown) {
    const result = this.validate(value)
    if (!result.isValid)
      throw new Error(result.errors.join(", "))
    return value as boolean;
  }
}