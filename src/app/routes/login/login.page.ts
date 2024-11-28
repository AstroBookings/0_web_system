import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { LoginDto } from '@models/login.dto';
import { LogService, provideLog } from 'src/app/shared/services/log.service';
import LoginFormComponent from './login-form.component';
import { LoginService } from './login.service';

/**
 * LoginPage
 * - Routed component for login
 * @requires LoginService - to send the login request
 * @requires LogService - to log the login process
 */
@Component({
  selector: 'lab-login',
  providers: [provideLog('🔐 Login Page')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent, JsonPipe],
  template: `
    <h1>🔐 Login</h1>
    <lab-login-form (login)="onLogin($event)" />
    @if (loginResource.error()) {
      <pre>Error: {{ loginResource.error() | json }}</pre>
    }
    @if (loginResource.value()) {
      <pre>Value: {{ loginResource.value() | json }}</pre>
    }
  `,
})
export default class LoginPage {
  private readonly logService = inject(LogService);
  private readonly service = inject(LoginService);
  private loginDto: LoginDto | undefined = undefined;

  /**
   * Login resource
   * - RxResource for calling an observable
   * - Sets the value, the error and the loading state
   */
  protected readonly loginResource = rxResource({
    loader: () => this.service.login(this.loginDto),
  });

  /**
   * On login event
   * @param dto - LoginDto
   */
  protected onLogin(dto: LoginDto) {
    this.logService.log('onLogin', dto);
    this.loginDto = dto;
    this.loginResource.reload();
  }
}
