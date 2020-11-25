import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { User } from '../../user/entities/user.entity';
import { UserMetaFilterDTO } from '../dtos/user-meta.filter.dto';
import { UserMeta } from '../entities/user.meta.entity';

export interface IUserMetaRepository extends IRepositoryBase<UserMeta> {
    getByUserId(userId: User['id'], key: UserMeta['key']): Promise<UserMeta>;
}
