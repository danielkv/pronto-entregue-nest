import { Inject, Injectable } from '@nestjs/common';
import { IRepositoryFiltersOptions } from 'src/modules/common/interfaces/IRepositoryFiltersOptions';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';
import { UserActiveFilter } from '../filters/user.active.filter';
import { UserCompanyFilter } from '../filters/user.company.filter';
import { UserIdFilter } from '../filters/user.id.filter';
import { IUserRepository } from '../interface/user.repository.interface';

@Injectable()
export class CountUsersService {
    constructor(
        @Inject('IUserRepository') private userRepository: IUserRepository,
        private userCompanyFilter: UserCompanyFilter,
        private userIdFilter: UserIdFilter,
        private userActiveFilter: UserActiveFilter,
    ) {}

    execute(filter: UserFilterDTO): Promise<number> {
        const options: IRepositoryFiltersOptions<User, UserFilterDTO> = {
            filter,
            filterHelpers: [this.userCompanyFilter, this.userIdFilter, this.userActiveFilter],
        };

        return this.userRepository.getCount(options);
    }
}
