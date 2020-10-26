import { Address } from 'src/modules/address/entities/address.entity';
import { User } from '../entities/user.entity';

export interface IAddUserAddressEvent {
    user: User;
    address: Address;
}
