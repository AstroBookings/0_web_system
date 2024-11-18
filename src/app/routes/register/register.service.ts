import { inject, Injectable } from '@angular/core';
import { UsersRepository } from '@api/users.repository';
import { RegisterDto } from '@models/register.dto';
import { LogService } from 'src/app/shared/services/log.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private usersRepository = inject(UsersRepository);
  private logService = inject(LogService);

  register(dto: RegisterDto) {
    this.logService.log('register', dto);
    this.usersRepository.postRegister(dto);
  }
}
