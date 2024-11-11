import { ChangeDetectionStrategy, Component } from '@angular/core';
import RegisterFormComponent from './register-form.component';

@Component({
  selector: 'lab-register',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RegisterFormComponent],
  template: `<h1>🔏 Register</h1>
    <lab-register-form />`,
})
export default class RegisterPage {}
