import { ICreateAddressEvent } from 'src/modules/address/interfaces/create-address-event.interface';
import { IUpdateAddressEvent } from 'src/modules/address/interfaces/update-address-event.interface';
import { IUpdateUserEvent } from 'src/modules/user-association/user/interface/update-user-event.interface';
import { ICreateUserEvent } from '../modules/user-association/user/interface/create-user-event.interface';

export interface IMainEvents {
    // user
    createUser(event: ICreateUserEvent): void;
    updateUser(event: IUpdateUserEvent): void;

    // address
    createAddress(event: ICreateAddressEvent): void;
    updateAddress(event: IUpdateAddressEvent): void;
}
