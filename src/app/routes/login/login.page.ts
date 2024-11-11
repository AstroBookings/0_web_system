import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginDto } from '@models/login.dto';
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
  template: `
    <h1>🔐 Login</h1>
    <lab-login-form (login)="onLogin($event)" />
  `,
})
export default class LoginPage {
  private service = inject(LoginService);

  /**
   * On login event
   * @param dto - LoginDto
   */
  onLogin(dto: LoginDto) {
    console.log('onLogin', dto);
    this.service.login(dto).subscribe((res) => {
      console.log('onLogin res', res);
    });
  }
}
