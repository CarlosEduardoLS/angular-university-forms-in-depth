import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createPasswordStrengthValidator(): ValidatorFn {
  return ({ value }: AbstractControl): ValidationErrors | null => {
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumber;

    return !passwordValid ? { passwordStrength: true } : null;
  };
}
