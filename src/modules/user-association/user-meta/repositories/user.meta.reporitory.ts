import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { UserMeta } from '../entities/user.meta.entity';
import { User } from '../../user/entities/user.entity';

@EntityRepository(UserMeta)
export class UserMetaRepository extends RepositoryBase<UserMeta> {
    getByUserId(userId: User['id'], key: UserMeta['key']): Promise<UserMeta> {
        const query = this.createQueryBuilder(this.tablename);

        query
            .where('userId = :userId')
            .andWhere('key = :key')
            .setParameters({ userId, key });

        return query.getOne();
    }
}
