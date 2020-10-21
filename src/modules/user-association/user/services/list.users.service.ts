import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryListOptions } from '../../../common/interfaces/IRepositoryListOptions';
import { PageInfo } from '../../../common/types/page-info';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';
import { UserActiveFilter } from '../filters/user.active.filter';
import { UserCompanyFilter } from '../filters/user.company.filter';
import { UserIdFilter } from '../filters/user.id.filter';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class ListUsersService {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        private userCompanyFilter: UserCompanyFilter,
        private userIdFilter: UserIdFilter,
        private userActiveFilter: UserActiveFilter,
    ) {}

    execute(filter: UserFilterDTO, pagination: PageInfo): Promise<User[]> {
        const options: IRepositoryListOptions<User, UserFilterDTO> = {
            pagination,
            filter,
            filterHelpers: [this.userCompanyFilter, this.userIdFilter, this.userActiveFilter],
        };

        return this.userRepository.getList(options);
    }
}
