import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { UserMeta } from '../entities/user.meta.entity';
import { UserMetaFilterDTO } from '../dtos/user-meta.filter.dto';

@EntityRepository(UserMeta)
export class UserMetaRepository extends RepositoryBase<UserMeta, UserMetaFilterDTO> {
    constructor() {
        super();
        this.setQueryBuilderTableName('userMeta');
    }
}

export const UserMetaRepositoryProvider = new RepositoryProviderFactory(
    'IUserMetaRepository',
    UserMetaRepository,
).create();
