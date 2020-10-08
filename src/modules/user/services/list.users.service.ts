import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from 'src/modules/common/types/page-info';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class ListUsersService {
    constructor(@Inject('IUserRepository') private userRepository: IUserRepository) {}

    execute(filter: UserFilterDTO, pagination: PageInfo): Promise<User[]> {
        return this.userRepository.getList(filter, pagination);
    }
}
