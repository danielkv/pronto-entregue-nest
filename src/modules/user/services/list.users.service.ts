import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageInfo } from 'src/modules/common/types/page-info';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.reporitory';

@Injectable()
export class ListUsersService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

    execute(filter: UserFilterDTO, pagination: PageInfo): Promise<User[]> {
        return this.userRepository.getList(filter, pagination);
    }
}
