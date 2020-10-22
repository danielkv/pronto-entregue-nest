import { Inject, Injectable } from '@nestjs/common';
import { PageInfo } from '../../../common/types/page-info';
import { UserMetaFilterDTO } from '../dtos/user-meta.filter.dto';
import { UserMeta } from '../entities/user.meta.entity';
import { UserMetaUserFilter } from '../filters/user-meta-user.filter';
import { IUserMetaListOptions } from '../interfaces/user-meta-list-options.interface';
import { IUserMetaRepository } from '../interfaces/user-meta.repository.interface';

@Injectable()
export class ListUserMetasService {
    constructor(
        @Inject('IUserMetaRepository') private userMetaRepository: IUserMetaRepository,
        private userMetaUserFilter: UserMetaUserFilter,
    ) {}

    execute(filter?: UserMetaFilterDTO, pagination?: PageInfo): Promise<UserMeta[]> {
        const options: IUserMetaListOptions = {
            pagination,
            filter,
            filterHelpers: [this.userMetaUserFilter],
        };

        return this.userMetaRepository.getList(options);
    }
}
