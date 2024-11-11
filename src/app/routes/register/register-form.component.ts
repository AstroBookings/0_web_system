import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-register-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form>
      <fieldset>
        <div>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <div>
          <label for="role">Role</label>
          <select id="role" name="role">
            <option value="admin" selected>Admin</option>
            <option value="agency">Agency</option>
            <option value="traveler">Traveler</option>
          </select>
        </div>
      </fieldset>
    </form>
  `,
})
export default class RegisterFormComponent {}
