import { ICreateAddressEvent } from '../modules/address/interfaces/create-address-event.interface';
import { IUpdateAddressEvent } from '../modules/address/interfaces/update-address-event.interface';
import { ICreateCategoryEvent } from '../modules/category/interfaces/create-category-event.interface';
import { IUpdateCategoryEvent } from '../modules/category/interfaces/update-category-event.interface';
import { ICreateCompanyEvent } from '../modules/company-association/company/interfaces/create-company-event.interface';
import { IUpdateCompanyEvent } from '../modules/company-association/company/interfaces/update-company-event.interface';
import { IAddUserAddressEvent } from '../modules/user-association/user/interface/add-user-address-event.interface';
import { IUpdateUserAddressEvent } from '../modules/user-association/user/interface/update-user-address-event.interface';
import { IUpdateUserEvent } from '../modules/user-association/user/interface/update-user-event.interface';
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
    createCompany(event: ICreateCompanyEvent): void;
    updateCompany(event: IUpdateCompanyEvent): void;

    // company category
    createCompanyCategory(event: ICreateCategoryEvent): void;
    updateCompanyCategory(event: IUpdateCategoryEvent): void;
}
