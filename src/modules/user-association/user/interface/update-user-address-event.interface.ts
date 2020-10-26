import { Address } from 'src/modules/address/entities/address.entity';
import { User } from '../entities/user.entity';

export interface IUpdateUserAddressEvent {
    user: User;
    address: Address;
}
