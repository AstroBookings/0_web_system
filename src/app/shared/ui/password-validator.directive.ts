import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

/**
 * PasswordValidatorDirective
 * - Validates the password strength
 * @implements Validator - the interface to be called by the form
 * @providers NG_VALIDATORS - to register the directive to the control
 */
@Directive({
  selector: '[labPasswordValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidatorDirective), multi: true }],
})
export class PasswordValidatorDirective implements Validator {

  /**
   * A method to validate the password strength
   * @param control - The control to validate
   * @returns ValidationErrors | null - The validation errors or null if the control is valid
   */
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    //  has a digit and a letter
    const hasDigit = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    let errors = null;
    if (!hasDigit || !hasLetter) {
      errors = { passwordStrength: { value: password, error: 'Password must have a digit and a letter' } };
    }
    return errors;
  }
}
