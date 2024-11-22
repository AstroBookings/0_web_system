import { inject, Injectable } from '@angular/core';
import { UsersRepository } from '@api/users.repository';
import { RegisterDto } from '@models/register.dto';
import { UserTokenDto } from '@models/user-token.dto';
import { Observable, of } from 'rxjs';
import { LogService } from 'src/app/shared/services/log.service';

/**
 * RegisterService
 * - Handles the register process
 * @requires UsersRepository - to post the register request
 * @requires LogService - to log the register process
 */
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private usersRepository = inject(UsersRepository);
  private readonly logService = inject(LogService);

  /**
   * Sends the register request
   * @param dto - RegisterDto
   * @returns Observable<UserTokenDto>
   */
  public register(dto: RegisterDto | undefined): Observable<UserTokenDto | undefined> {
    if (!dto) {
      return of(undefined);
    }
    this.logService.log('register', dto);
    return this.usersRepository.postRegister(dto);
  }
}
