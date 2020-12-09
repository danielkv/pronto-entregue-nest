import { ValueProvider } from '@nestjs/common';
import { AccessControl } from 'accesscontrol';
import { AppRoles } from '../enums/app-roles.enum';
import { ACLResourcesEnum } from '../enums/resources.enum';

export const ac: AccessControl = new AccessControl();

export const AccessControlProvider: ValueProvider = {
    provide: 'AccessControl',
    useValue: ac,
};

ac.grant(AppRoles.PRODUCTS_READ).read(ACLResourcesEnum.PRODUCT);
ac.grant(AppRoles.PRODUCTS_READ_OWN).readOwn(ACLResourcesEnum.PRODUCT);
ac.grant(AppRoles.PRODUCTS_CREATE).create(ACLResourcesEnum.PRODUCT);
ac.grant(AppRoles.PRODUCTS_CREATE_OWN).createOwn(ACLResourcesEnum.PRODUCT);
ac.grant(AppRoles.PRODUCTS_EDIT).update(ACLResourcesEnum.PRODUCT);
ac.grant(AppRoles.PRODUCTS_EDIT_OWN).updateOwn(ACLResourcesEnum.PRODUCT);

ac.grant(AppRoles.COMPANIES_READ).read(ACLResourcesEnum.COMPANY);
ac.grant(AppRoles.COMPANIES_READ_OWN).readOwn(ACLResourcesEnum.COMPANY);
ac.grant(AppRoles.COMPANIES_CREATE).create(ACLResourcesEnum.COMPANY);
ac.grant(AppRoles.COMPANIES_CREATE_OWN).createOwn(ACLResourcesEnum.COMPANY);
ac.grant(AppRoles.COMPANIES_EDIT).update(ACLResourcesEnum.COMPANY);
ac.grant(AppRoles.COMPANIES_EDIT_OWN).updateOwn(ACLResourcesEnum.COMPANY);

ac.grant(AppRoles.ORDERS_READ).read(ACLResourcesEnum.ORDER);
ac.grant(AppRoles.ORDERS_READ_OWN).readOwn(ACLResourcesEnum.ORDER);
ac.grant(AppRoles.ORDERS_CREATE).create(ACLResourcesEnum.ORDER);
ac.grant(AppRoles.ORDERS_CREATE_OWN).createOwn(ACLResourcesEnum.ORDER);
ac.grant(AppRoles.ORDERS_EDIT).update(ACLResourcesEnum.ORDER);
ac.grant(AppRoles.ORDERS_EDIT_OWN).updateOwn(ACLResourcesEnum.ORDER);

ac.grant(AppRoles.ORDERS_STATUS_CHANGE).update(ACLResourcesEnum.ORDER_STATUS);
ac.grant(AppRoles.ORDERS_STATUS_CHANGE_OWN).updateOwn(ACLResourcesEnum.ORDER_STATUS);

ac.grant(AppRoles.USERS_READ).read(ACLResourcesEnum.USER);
ac.grant(AppRoles.USERS_CREATE).create(ACLResourcesEnum.USER);
ac.grant(AppRoles.USERS_CREATE_OWN).createOwn(ACLResourcesEnum.USER);
ac.grant(AppRoles.USERS_EDIT).update(ACLResourcesEnum.USER);
ac.grant(AppRoles.USERS_EDIT_OWN).updateOwn(ACLResourcesEnum.USER);

ac.grant(AppRoles.ROLES_READ).read(ACLResourcesEnum.ROLE);
ac.grant(AppRoles.ROLES_EDIT).update(ACLResourcesEnum.ROLE);

ac.grant(AppRoles.CUSTOMER).extend([AppRoles.ORDERS_CREATE_OWN, AppRoles.ORDERS_READ_OWN, AppRoles.ORDERS_EDIT_OWN]);

ac.grant(AppRoles.COMPANY_USER).extend([
    AppRoles.PRODUCTS_READ_OWN,
    AppRoles.PRODUCTS_CREATE_OWN,
    AppRoles.PRODUCTS_EDIT_OWN,
]);

ac.grant(AppRoles.REGION_OWNER).extend([
    AppRoles.COMPANY_USER,
    AppRoles.COMPANIES_CREATE_OWN,
    AppRoles.COMPANIES_EDIT_OWN,
    AppRoles.COMPANIES_READ_OWN,
]);

ac.grant(AppRoles.MASTER).extend(Object.values(AppRoles).filter(role => role !== AppRoles.MASTER));

ac.lock();
