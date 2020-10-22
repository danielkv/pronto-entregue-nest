import { IRepositoryListOptions } from 'src/modules/common/interfaces/IRepositoryListOptions';
import { UserMetaFilterDTO } from '../dtos/user-meta.filter.dto';
import { UserMeta } from '../entities/user.meta.entity';

export interface IUserMetaListOptions extends IRepositoryListOptions<UserMeta, UserMetaFilterDTO> {}
