import {
  ChangeDetectionStrategy,
  Component,
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
import { ControlBlock } from '@ui/control.block';

/**
 * RegisterFormComponent
 * - Form component for the register process
 */
@Component({
  selector: 'lab-register-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ControlBlock],
  template: `
    <form #form="ngForm">
      <fieldset>
        <lab-control [control]="nameControl">
          <input [(ngModel)]="name" #nameControl="ngModel" type="text" id="name" name="name" required minlength="3" />
        </lab-control>
        <lab-control [control]="emailControl">
          <input [(ngModel)]="email" #emailControl="ngModel" type="email" id="email" name="email" required email />
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
          <select id="role" name="role" [(ngModel)]="role" #roleControl="ngModel">
            <option value="admin" selected>Admin</option>
            <option value="agency">Agency</option>
            <option value="traveler">Traveler</option>
          </select>
        </lab-control>
      </fieldset>
      <button type="button" (click)="sendRegisterDto()" [disabled]="form.invalid">Register</button>
    </form>
  `,
})
export default class RegisterFormComponent {
  /**
   * Name
   */
  protected readonly name: WritableSignal<string> = signal<string>('');

  /**
   * Email
   */
  protected readonly email: WritableSignal<string> = signal<string>('');

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
   * Confirm password control
   * - required signal to access to template variable #confirmPasswordControl
   */
  protected readonly confirmPasswordControl: Signal<NgModel> = viewChild.required<NgModel>('confirmPasswordControl');

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
  public readonly register: OutputEmitterRef<RegisterDto> = output<RegisterDto>();

  /**
   * On register click event handler
   */
  protected sendRegisterDto() {
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
