import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[labPasswordValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidatorDirective), multi: true }],
})
export class PasswordValidatorDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    //  has a digit and a letter
    const hasDigit = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    if (!hasDigit || !hasLetter) {
      return { passwordStrength: { value: password, error: 'Password must have a digit and a letter' } };
    }
    return null;
  }
}
