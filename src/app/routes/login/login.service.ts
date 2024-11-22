import { Injectable, inject } from '@angular/core';
import { LoginDto } from '@models/login.dto';
import { UserTokenDto } from '@models/user-token.dto';
import { Observable, of } from 'rxjs';
import { UsersRepository } from 'src/app/shared/api/users.repository';
import { LogService } from 'src/app/shared/services/log.service';

/**
 * LoginService
 * - Business logic for login
 * @requires UsersRepository - to post the login request
 * @requires LogService - to log the login process
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private repository = inject(UsersRepository);
  private logService = inject(LogService);

  /**
   * Sends the login request
   * @param dto - LoginDto
   * @returns Observable<UserTokenDto>
   */
  login(dto: LoginDto | undefined): Observable<UserTokenDto | undefined> {
    if (!dto) return of(undefined);
    this.logService.log('login', dto);
    return this.repository.postLogin(dto);
  }
}
