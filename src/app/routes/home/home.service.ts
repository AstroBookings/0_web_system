import { inject, Injectable } from '@angular/core';
import { UsersRepository } from '@api/users.repository';
import { UserDto } from '@models/user.dto';
import { LogService } from 'src/app/shared/services/log.service';

/**
 * HomeService
 * - Business logic for home page
 * @requires UsersRepository - API calls for users resources
 * @requires LogService - Logging service
 */
@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private usersRepository = inject(UsersRepository);
  private logService = inject(LogService);

  private usersData: UserDto[] = [];

  /**
   * Load users
   * @returns UserDto[]
   */
  public loadUsers(): UserDto[] {
    this.usersData = this.usersRepository.getAll();
    this.logService.log('HomeService: Loaded users', this.usersData);
    return this.usersData;
  }

  /**
   * Add user
   * @param user - UserDto
   */
  public addUser(user: UserDto): void {
    this.usersData.push(user);
  }
}
