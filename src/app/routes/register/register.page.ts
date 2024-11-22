import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, ResourceStatus, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RegisterDto } from '@models/register.dto';
import { of } from 'rxjs';
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
    <pre>Status: {{ statusText() }}</pre>
    <pre>Value: {{ registerResource.value() | json }}</pre>
  `,
})
export default class RegisterPage {
  private readonly logService = inject(LogService);
  private readonly service = inject(RegisterService);
  private readonly registerDto = signal<RegisterDto | undefined>(undefined);

  protected readonly registerResource = rxResource({
    request: () => ({ registerDto: this.registerDto() }),
    loader: (params) => {
      const registerDto = params.request.registerDto;
      if (!registerDto) {
        return of(undefined);
      }
      return this.service.register(registerDto);
    },
  });

  /**
   * On register event handler
   * @param registerDto - RegisterDto
   */
  protected register(registerDto: RegisterDto) {
    this.logService.log('setting register', registerDto);
    this.registerDto.set(registerDto);
  }

  protected statusText = computed(() => ResourceStatus[this.registerResource.status()]);
}
