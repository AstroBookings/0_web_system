import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RegisterDto } from '@models/register.dto';
import { Role } from '@models/role.enum';
import { PasswordValidatorDirective } from '@ui/password-validator.directive';

/**
 * RegisterFormComponent
 * - Form component for the register process
 * @requires PasswordValidatorDirective - to validate the password strength
 */
@Component({
  selector: 'lab-register-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule,  PasswordValidatorDirective],
  template: `
    <form #form="ngForm">
      <fieldset>
            <form #f="ngForm">
      <fieldset>
        <section>
          <label for="username">User name</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="User name"
            [(ngModel)]="name"
            #usernameModel="ngModel"
            required
            minlength="3"
            labPasswordValidator
            [attr.aria-invalid]="modelInvalid(usernameModel)"
          />
          @if(modelInvalid(usernameModel)){
          <small>User name must be at least 3 characters long</small>
          }
        </section>
        <section>
          <label for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            [(ngModel)]="email"
            #emailModel="ngModel"
            required
            email
            [attr.aria-invalid]="modelInvalid(emailModel)"
          />
          @if(modelInvalid(emailModel)){
          <small>Invalid email</small>
          }
        </section>
        <section>
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            [(ngModel)]="password"
            #passwordModel="ngModel"
            required
            minlength="4"
            [attr.aria-invalid]="modelInvalid(passwordModel)"
          />
          @if(modelInvalid(passwordModel)){
          <small>Password must be at least 4 characters long</small>
          }
        </section>
        <section>
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            [(ngModel)]="confirmPassword"
            #confirmPasswordModel="ngModel"
            [attr.aria-invalid]="modelInvalid(confirmPasswordModel)"
          />
        </section>
      </fieldset>
      <button type="submit" [disabled]="f.invalid" (click)="submitRegisterDto()">
        Register
      </button>
    </form>
      
  `,
})
export default class RegisterFormComponent {
  /**
   * Name
   */
  protected readonly name: WritableSignal<string> = signal<string>('lab');

  /**
   * Email
   */
  protected readonly email: WritableSignal<string> = signal<string>('lab@lab.com');

  /**
   * Password
   */
  protected readonly password: WritableSignal<string> = signal<string>('');

  /**
   * Confirm password
   */
  protected readonly confirmPassword: WritableSignal<string> = signal<string>('');

  /**
   * Role
   */
  protected readonly role: WritableSignal<'admin' | 'agency' | 'traveler'> = signal<'admin'>('admin');

  /**
   * Check if a model is touched and has errors
   * @param model - NgModel
   * @returns boolean | undefined - true if the model is touched and has errors, undefined otherwise
   */
  protected modelInvalid(model: NgModel): boolean | undefined {
    if (!model.touched) return undefined;
    return model.invalid === true;
  }

  /**
   * Confirm password control
   * - required signal to access to template variable #confirmPasswordControl
   */
  protected readonly confirmPasswordControl: Signal<NgModel> = viewChild.required<NgModel>('confirmPasswordControl');

  /**
   * Password matches
   */
  protected readonly passwordMatches = computed(() => this.password() === this.confirmPassword());

  /**
   * Validation implementation as an effect
   */
  private passwordMatchValidatorEffect = effect(() => {
    // signal triggers
    const confirmPasswordControl = this.confirmPasswordControl();
    const passwordMatches = this.passwordMatches();
    let errors = null;
    // logic with effects
    if (passwordMatches) {
      errors = null;
    } else {
      errors = { mismatch: true };
    }
    confirmPasswordControl.control.setErrors(errors);
  });

  /**
   * On register event
   * - Emits a RegisterDto
   */
  public readonly register: OutputEmitterRef<RegisterDto> = output<RegisterDto>();

  /**
   * On register click event handler
   */
  protected submitRegisterDto() {
    const registerDto: RegisterDto = {
      name: this.name(),
      email: this.email(),
      password: this.password(),
      role: this.role() as Role,
    };
    console.log('onRegisterClick', registerDto);
    this.register.emit(registerDto);
  }
}
