import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  imports: [RegisterFormComponent],
  template: `
    <h1>🔏 Register</h1>
    <lab-register-form (register)="onRegister($event)" />
  `,
})
export default class RegisterPage {
  private readonly logService = inject(LogService);
  private readonly service = inject(RegisterService);

  /**
   * On register event handler
   * @param registerDto - RegisterDto
   */
  protected onRegister(registerDto: RegisterDto) {
    this.logService.log('onRegister', registerDto);
    this.service.register(registerDto).subscribe();
  }
}
