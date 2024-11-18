import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginDto } from '@models/login.dto';
import { ControlBlock } from '@ui/control.block';

/**
 * LoginFormComponent
 * - Login form
 */
@Component({
  selector: 'lab-login-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ControlBlock],
  template: `
    <form #form="ngForm">
      <fieldset>
        <div>
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
        </div>
        <div>
          <lab-control [control]="passwordControl">
            <input
              [(ngModel)]="password"
              #passwordControl="ngModel"
              type="password"
              id="password"
              name="password"
              required
            />
          </lab-control>
        </div>
      </fieldset>
      <button type="button" (click)="onLoginClick()" [disabled]="form.invalid">
        Login
      </button>
    </form>
  `,
})
export default class LoginFormComponent {
  /**
   * On login event
   * - Emits a LoginDto
   */
  login = output<LoginDto>();

  /**
   * Email
   */
  email = signal<string>('');

  /**
   * Password
   */
  password = signal<string>('');

  /**
   * On login click
   */
  onLoginClick() {
    console.log('onLoginClick');
    this.login.emit({
      email: 'test@test.com',
      password: 'password',
    });
  }
}
