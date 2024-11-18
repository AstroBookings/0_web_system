import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginDto } from '@models/login.dto';
import {
  LogService,
  provideLogService,
} from 'src/app/shared/services/log.service';
import LoginFormComponent from './login-form.component';
import { LoginService } from './login.service';

/**
 * LoginPage
 * - Routed component for login
 * @requires LoginService
 */
@Component({
  selector: 'lab-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent],
  providers: [provideLogService('LoginPage')],
  template: `
    <h1>🔐 Login</h1>
    <lab-login-form (login)="onLogin($event)" />
  `,
})
export default class LoginPage {
  private logService = inject(LogService);
  private service = inject(LoginService);

  /**
   * On login event
   * @param dto - LoginDto
   */
  onLogin(dto: LoginDto) {
    this.logService.log('onLogin', dto);
    this.service.login(dto).subscribe((res) => {
      this.logService.log('onLogin res', res);
    });
  }
}
