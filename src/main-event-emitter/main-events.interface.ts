import { ICreateAddressEvent } from 'src/modules/address/interfaces/create-address-event.interface';
import { IUpdateAddressEvent } from 'src/modules/address/interfaces/update-address-event.interface';
import { ICreateCategoryEvent } from 'src/modules/category/interfaces/create-category-event.interface';
import { IUpdateCategoryEvent } from 'src/modules/category/interfaces/update-category-event.interface';
import { IAddUserAddressEvent } from 'src/modules/user-association/user/interface/add-user-address-event.interface';
import { IUpdateUserAddressEvent } from 'src/modules/user-association/user/interface/update-user-address-event.interface';
import { IUpdateUserEvent } from 'src/modules/user-association/user/interface/update-user-event.interface';
import { ICreateUserEvent } from '../modules/user-association/user/interface/create-user-event.interface';

export interface IMainEvents {
    // user
    createUser(event: ICreateUserEvent): void;
    updateUser(event: IUpdateUserEvent): void;

    // user address
    addUserAddress(event: IAddUserAddressEvent): void;
    updateUserAddress(event: IUpdateUserAddressEvent): void;

    // address
    createAddress(event: ICreateAddressEvent): void;
    updateAddress(event: IUpdateAddressEvent): void;

    // category
    createCategory(event: ICreateCategoryEvent): void;
    updateCategory(event: IUpdateCategoryEvent): void;

    // company category
    createCompanyCategory(event: ICreateCategoryEvent): void;
    updateCompanyCategory(event: IUpdateCategoryEvent): void;
}
