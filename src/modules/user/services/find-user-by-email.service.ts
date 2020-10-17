import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class FindUserByEmailService {
    constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {}

    execute(email: string): Promise<User> {
        return this.userRepository.findByEmail(email);
    }
}
