import type { ValidationResult, ValidationErrorItem } from '../types';

export function validateAmount(amount: string): ValidationResult {
  const errors: ValidationErrorItem[] = [];

  if (!amount) {
    errors.push({
      field: 'amount',
      message: 'Amount is required'
    });
    return { isValid: false, errors };
  }

  const numAmount = parseFloat(amount);

  if (isNaN(numAmount)) {
    errors.push({
      field: 'amount',
      message: 'Amount must be a valid number'
    });
  } else if (numAmount <= 0) {
    errors.push({
      field: 'amount',
      message: 'Amount must be greater than 0'
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}