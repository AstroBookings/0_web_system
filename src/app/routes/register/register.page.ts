import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RegisterDto } from '@models/register.dto';
import { LogService, provideLog } from 'src/app/shared/services/log.service';
import RegisterFormComponent from './register-form.component';
import { RegisterService } from './register.service';

/**
 * RegisterPage component
 * - Routed page for the register process
 * @requires RegisterService - to send the register request
 * @requires LogService - to log the register process
 */
@Component({
  selector: 'lab-register',
  providers: [provideLog('🔏 Register Page')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RegisterFormComponent, JsonPipe],
  template: `
    <h1>🔏 Register</h1>
    <lab-register-form (register)="register($event)" />
    @if (registerResource.error()) {
      <pre>Error: {{ registerResource.error() | json }}</pre>
    }
    @if (registerResource.value()) {
      <pre>Value: {{ registerResource.value() | json }}</pre>
    }
  `,
})
export default class RegisterPage {
  private readonly logService = inject(LogService);
  private readonly service = inject(RegisterService);
  private registerDto: RegisterDto | undefined = undefined;

  /**
   * Register resource
   * - RxResource for calling an observable
   * - Sets the value, the error and the loading state
   */
  protected readonly registerResource = rxResource({
    loader: () => this.service.register(this.registerDto),
  });

  /**
   * On register event handler
   * @param registerDto - RegisterDto
   */
  protected register(registerDto: RegisterDto) {
    this.logService.log('setting register', registerDto);
    this.registerDto = registerDto;
    this.registerResource.reload();
  }
}
