import { FieldsErrors } from '../validators/validator-field-interface';

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(
    public error: FieldsErrors[],
    message = 'Entity Validation Error',
  ) {
    super(message);
    this.name = 'EntityValidationError';
  }

  count() {
    return Object.keys(this.error).length;
  }
}
