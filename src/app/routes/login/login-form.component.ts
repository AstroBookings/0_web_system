import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * LoginFormComponent
 */
@Component({
  selector: 'lab-login-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form>
      <fieldset>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
      </fieldset>
      <button type="submit">Login</button>
    </form>
  `,
})
export default class LoginFormComponent {}
