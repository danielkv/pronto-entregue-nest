import { RepositoryBase } from 'src/modules/common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { UserMeta } from '../entities/user.meta.entity';

@EntityRepository(UserMeta)
export class UserMetaRepository extends RepositoryBase<UserMeta> {}
