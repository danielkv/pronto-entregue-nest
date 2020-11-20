import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { UserMeta } from '../entities/user.meta.entity';
import { UserMetaFilterDTO } from '../dtos/user-meta.filter.dto';
import { User } from '../../user/entities/user.entity';
import { IUserMetaRepository } from '../interfaces/user-meta.repository.interface';

@EntityRepository(UserMeta)
export class UserMetaRepository extends RepositoryBase<UserMeta, UserMetaFilterDTO> implements IUserMetaRepository {
    constructor() {
        super();
        this.setQueryBuilderTableName('userMeta');
    }

    getByUserId(userId: User['id'], key: UserMeta['key']): Promise<UserMeta> {
        const query = this.createQueryBuilder(this.tablename);

        query
            .where('userId = :userId')
            .andWhere('key = :key')
            .setParameters({ userId, key });

        return query.getOne();
    }
}

export const UserMetaRepositoryProvider = new RepositoryProviderFactory(
    'IUserMetaRepository',
    UserMetaRepository,
).create();
