import {
  ChangeDetectionStrategy,
  Component,
  effect,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RegisterDto } from '@models/register.dto';
import { Role } from '@models/role.enum';
import { ControlBlock } from '@ui/control.block';

@Component({
    selector: 'lab-register-form',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, ControlBlock],
    template: `
    <form #form="ngForm">
      <fieldset>
        <lab-control [control]="nameControl">
          <input
            [(ngModel)]="name"
            #nameControl="ngModel"
            type="text"
            id="name"
            name="name"
            required
            minlength="3"
          />
        </lab-control>
        <lab-control [control]="emailControl">
          <input
            [(ngModel)]="email"
            #emailControl="ngModel"
            type="email"
            id="email"
            name="email"
            required
            email
          />
        </lab-control>
        <lab-control [control]="passwordControl">
          <input
            [(ngModel)]="password"
            #passwordControl="ngModel"
            type="password"
            id="password"
            name="password"
            required
            minlength="4"
          />
        </lab-control>
        <lab-control [control]="confirmPasswordControl">
          <input
            [(ngModel)]="confirmPassword"
            #confirmPasswordControl="ngModel"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            minlength="4"
          />
        </lab-control>
        <lab-control [control]="roleControl">
          <select
            id="role"
            name="role"
            [(ngModel)]="role"
            #roleControl="ngModel"
          >
            <option value="admin" selected>Admin</option>
            <option value="agency">Agency</option>
            <option value="traveler">Traveler</option>
          </select>
        </lab-control>
      </fieldset>
      <button
        type="button"
        (click)="onRegisterClick()"
        [disabled]="form.invalid"
      >
        Register
      </button>
    </form>
  `
})
export default class RegisterFormComponent {
  /**
   * Name
   */
  name = signal<string>('');

  /**
   * Email
   */
  email = signal<string>('');

  /**
   * Password
   */
  password = signal<string>('');

  /**
   * Confirm password
   */
  confirmPassword = signal<string>('');

  /**
   * Role
   */
  role = signal<'admin' | 'agency' | 'traveler'>('admin');

  /**
   * Confirm password control
   * - required signal to access to template variable #confirmPasswordControl
   */
  confirmPasswordControl = viewChild.required<NgModel>(
    'confirmPasswordControl'
  );

  private passwordMatchValidatorEffect = effect(() => {
    // signal triggers
    const confirmPasswordControl = this.confirmPasswordControl();
    const password = this.password();
    const confirmPassword = this.confirmPassword();
    // logic with effects
    if (password !== confirmPassword) {
      confirmPasswordControl.control.setErrors({ mismatch: true });
    } else {
      confirmPasswordControl.control.setErrors(null);
    }
  });

  /**
   * On register event
   * - Emits a RegisterDto
   */
  register = output<RegisterDto>();

  /**
   * On register click event handler
   */
  onRegisterClick() {
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
