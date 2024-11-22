import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { UserDto } from '@models/user.dto';

/**
 * User List component
 */
@Component({
  selector: 'lab-user-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @for (user of users(); track user.name) {
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
      <p>{{ user.role }}</p>
    }
  `,
})
export class UserListComponent {
  /**
   * Users data
   * - An array of UserDto
   */
  public users: InputSignal<UserDto[]> = input<UserDto[]>([]);
}
