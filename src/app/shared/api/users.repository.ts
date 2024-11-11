import { Injectable } from '@angular/core';
import { LoginDto } from '@models/login.dto';
import { UserTokenDto } from '@models/user-token.dto';
import { Observable, of } from 'rxjs';

/**
 * UsersRepository
 * - Async API calls for users resources
 */
@Injectable({
  providedIn: 'root',
})
export class UsersRepository {
  /**
   * POST /login
   * @param dto - LoginDto
   * @returns Observable<UserTokenDto>
   */
  postLogin(dto: LoginDto): Observable<UserTokenDto> {
    return of({
      user: {
        id: '1',
        name: 'John Doe',
        email: dto.email,
        role: 'traveler',
      },
      token: 'token',
    });
  }
}
