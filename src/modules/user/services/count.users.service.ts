import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { UserRepository } from '../repositories/user.reporitory';

@Injectable()
export class CountUsersService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    execute(filter: UserFilterDTO): Promise<number> {
        return this.userRepository.getCount(filter);
    }
}
