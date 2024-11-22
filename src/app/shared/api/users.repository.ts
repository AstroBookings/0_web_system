import { Injectable } from '@angular/core';
import { LoginDto } from '@models/login.dto';
import { RegisterDto } from '@models/register.dto';
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
   * POST /register
   * @param dto - RegisterDto
   * @returns Observable<UserTokenDto>
   */
  public postRegister(dto: RegisterDto): Observable<UserTokenDto> {
    console.log('postRegister', dto);
    return of({
      user: {
        id: '1',
        name: dto.name,
        email: dto.email,
        role: dto.role,
      },
      token: 'token',
    });
  }

  /**
   * POST /login
   * @param dto - LoginDto
   * @returns Observable<UserTokenDto>
   */
  public postLogin(dto: LoginDto): Observable<UserTokenDto> {
    console.log('postLogin', dto);
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
