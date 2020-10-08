import { IRepositoryBase } from 'src/modules/common/interfaces/repository.base.interface';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IRepositoryBase<User, UserFilterDTO> {}
