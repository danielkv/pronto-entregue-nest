import { RepositoryProviderFactory } from '../../../common/helpers/repository-provider.factory';
import { RepositoryBase } from '../../../common/repositories/repository.base';
import { EntityRepository } from 'typeorm';
import { UserMeta } from '../entities/user.meta.entity';

@EntityRepository(UserMeta)
export class UserMetaRepository extends RepositoryBase<UserMeta> {}

export const UserMetaRepositoryProvider = new RepositoryProviderFactory(
    'IUserMetaRepository',
    UserMetaRepository,
).create();
