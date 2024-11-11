import { ChangeDetectionStrategy, Component, output } from '@angular/core';
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
  imports: [ControlBlock],
  template: `
    <form>
      <fieldset>
        <div>
          <lab-control controlName="email">
            <input type="email" id="email" name="email" />
          </lab-control>
        </div>
        <div>
          <lab-control controlName="password">
            <input type="password" id="password" name="password" />
          </lab-control>
        </div>
      </fieldset>
      <button type="button" (click)="onLoginClick()">Login</button>
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
