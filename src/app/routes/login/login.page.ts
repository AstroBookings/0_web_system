import { ChangeDetectionStrategy, Component } from '@angular/core';
import LoginFormComponent from './login-form.component';

@Component({
  selector: 'lab-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoginFormComponent],
  template: `
    <h1>🔐 Login</h1>
    <lab-login-form />
  `,
})
export default class LoginPage {}
