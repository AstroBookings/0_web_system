import { Injectable, inject } from '@angular/core';
import { LoginDto } from '@models/login.dto';
import { UserTokenDto } from '@models/user-token.dto';
import { Observable } from 'rxjs';
import { UsersRepository } from 'src/app/shared/api/users.repository';
import { LogService } from 'src/app/shared/services/log.service';

/**
 * LoginService
 * - Business logic for login
 * @requires UsersRepository
 */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private repository = inject(UsersRepository);
  private logService = inject(LogService);

  /**
   * POST /login
   * @param dto - LoginDto
   * @returns Observable<UserTokenDto>
   */
  login(dto: LoginDto): Observable<UserTokenDto> {
    this.logService.log('login', dto);
    return this.repository.postLogin(dto);
  }
}
