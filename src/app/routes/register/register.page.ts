import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterDto } from '@models/register.dto';
import RegisterFormComponent from './register-form.component';

@Component({
  selector: 'lab-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RegisterFormComponent],
  template: `<h1>🔏 Register</h1>
    <lab-register-form (register)="onRegister($event)" />`,
})
export default class RegisterPage {
  /**
   * On register event handler
   * @param registerDto - RegisterDto
   */
  onRegister(registerDto: RegisterDto) {
    console.log('onRegister', registerDto);
  }
}
