import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class GetUserService {
    constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {}

    execute(userId: User['id']): Promise<User>;
    execute(userId: User['id'][]): Promise<User[]>;
    execute(userId: any): Promise<User | User[]> {
        return this.userRepository.get(userId);
    }
}
