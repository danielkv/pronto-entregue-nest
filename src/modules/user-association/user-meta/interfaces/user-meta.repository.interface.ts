import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { UserMetaFilterDTO } from '../dtos/user-meta.filter.dto';
import { UserMeta } from '../entities/user.meta.entity';

export interface IUserMetaRepository extends IRepositoryBase<UserMeta, UserMetaFilterDTO> {}
