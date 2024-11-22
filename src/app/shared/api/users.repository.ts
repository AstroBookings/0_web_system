import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginDto } from '@models/login.dto';
import { RegisterDto } from '@models/register.dto';
import { UserTokenDto } from '@models/user-token.dto';
import { UserDto } from '@models/user.dto';
import { Observable } from 'rxjs';
import { LogService } from '../services/log.service';

/**
 * UsersRepository
 * - Async API calls for users resources
 */
@Injectable({
  providedIn: 'root',
})
export class UsersRepository {
  private readonly logService = inject(LogService);
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3100/api';
  private readonly usersUrl = `${this.apiUrl}/users`;
  /**
   * Fake GET /users
   * @returns UserDto[]
   */
  public getAll(): UserDto[] {
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@acme.com',
        role: 'traveler',
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'jane@agency.com',
        role: 'agency',
      },
    ];
  }
  /**
   * POST /register
   * @param dto - RegisterDto
   * @returns Observable<UserTokenDto>
   */
  public postRegister(dto: RegisterDto): Observable<UserTokenDto> {
    this.logService.log('postRegister', dto);
    return this.httpClient.post<UserTokenDto>(`${this.usersUrl}/register`, dto);
  }

  /**
   * POST /login
   * @param dto - LoginDto
   * @returns Observable<UserTokenDto>
   */
  public postLogin(dto: LoginDto): Observable<UserTokenDto> {
    this.logService.log('postLogin', dto);
    return this.httpClient.post<UserTokenDto>(`${this.usersUrl}/login`, dto);
  }
}
