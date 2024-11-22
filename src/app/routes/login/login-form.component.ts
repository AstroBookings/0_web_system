import { ChangeDetectionStrategy, Component, output, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginDto } from '@models/login.dto';
import { ControlBlock } from '@ui/control.block';

/**
 * LoginFormComponent
 * - Login form
 */
@Component({
  selector: 'lab-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, ControlBlock],
  template: `
    <form #form="ngForm">
      <fieldset>
        <div>
          <lab-control [control]="emailControl">
            <input [(ngModel)]="email" #emailControl="ngModel" type="email" id="email" name="email" required email />
          </lab-control>
        </div>
        <div>
          <lab-control [control]="passwordControl">
            <input
              [(ngModel)]="password"
              #passwordControl="ngModel"
              type="password"
              id="password"
              name="password"
              required
            />
          </lab-control>
        </div>
      </fieldset>
      <button type="button" (click)="sendLoginDto()" [disabled]="form.invalid">Login</button>
    </form>
  `,
})
export default class LoginFormComponent {
  /**
   * On login event
   * - Emits a LoginDto
   */
  public readonly login: OutputEmitterRef<LoginDto> = output<LoginDto>();

  /**
   * Email
   */
  protected readonly email: WritableSignal<string> = signal<string>('');

  /**
   * Password
   */
  protected readonly password: WritableSignal<string> = signal<string>('');

  /**
   * On login click
   */
  protected sendLoginDto() {
    const loginDto: LoginDto = {
      email: this.email(),
      password: this.password(),
    };
    console.log('onLoginClick', loginDto);
    this.login.emit(loginDto);
  }
}
