import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RegisterDto } from '@models/register.dto';
import { LogService, provideLog } from 'src/app/shared/services/log.service';
import RegisterFormComponent from './register-form.component';
import { RegisterService } from './register.service';

@Component({
  selector: 'lab-register',
  standalone: true,
  providers: [provideLog('🔏 Register Page')],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RegisterFormComponent],
  template: `
    <h1>🔏 Register</h1>
    <lab-register-form (register)="onRegister($event)" />
  `,
})
export default class RegisterPage {
  private logService = inject(LogService);
  private service = inject(RegisterService);

  /**
   * On register event handler
   * @param registerDto - RegisterDto
   */
  onRegister(registerDto: RegisterDto) {
    this.logService.log('onRegister', registerDto);
    this.service.register(registerDto);
  }
}
