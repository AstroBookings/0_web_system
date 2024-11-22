import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserDto } from '@models/user.dto';
import { LogService, provideLog } from 'src/app/shared/services/log.service';
import { HomeService } from './home.service';
import { UserListComponent } from './user-list.component';

/**
 * Home Page component
 * - Routed to /
 */
@Component({
  selector: 'lab-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserListComponent],
  providers: [provideLog('Home Page')],
  template: `
    <h1>Home</h1>
    <lab-user-list [users]="usersData" />
    <button (click)="loadUsers()">Load</button>
  `,
})
export default class HomePage {
  private homeService = inject(HomeService);
  private logService = inject(LogService);

  protected usersData: UserDto[] = [];

  protected loadUsers(): void {
    this.logService.log('Loading users');
    this.usersData = this.homeService.loadUsers();
  }
}
