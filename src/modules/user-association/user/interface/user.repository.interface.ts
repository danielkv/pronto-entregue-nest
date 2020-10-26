import { Address } from 'src/modules/address/entities/address.entity';
import { IRepositoryBase } from '../../../common/interfaces/repository.base.interface';
import { UserFilterDTO } from '../dtos/user.filter.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IRepositoryBase<User, UserFilterDTO> {
    findByEmail(email: string): Promise<User>;

    addAddress(userId: User['id'], addressId: Address['id']): Promise<any>;
    removeAddress(userId: User['id'], addressId: Address['id']): Promise<any>;
}
