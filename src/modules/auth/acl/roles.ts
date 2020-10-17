import { RolesBuilder } from 'nest-access-control';
import { AppRoles } from './app-roles.enum';
import { ACLResourcesEnum } from './resources.enum';

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(AppRoles.PRODUCTS_READ).read(ACLResourcesEnum.PRODUCT);
roles.grant(AppRoles.PRODUCTS_READ_OWN).readOwn(ACLResourcesEnum.PRODUCT);
roles.grant(AppRoles.PRODUCTS_CREATE).create(ACLResourcesEnum.PRODUCT);
roles.grant(AppRoles.PRODUCTS_CREATE_OWN).createOwn(ACLResourcesEnum.PRODUCT);
roles.grant(AppRoles.PRODUCTS_EDIT).update(ACLResourcesEnum.PRODUCT);
roles.grant(AppRoles.PRODUCTS_EDIT_OWN).updateOwn(ACLResourcesEnum.PRODUCT);

roles.grant(AppRoles.COMPANIES_READ).read(ACLResourcesEnum.COMPANY);
roles.grant(AppRoles.COMPANIES_READ_OWN).readOwn(ACLResourcesEnum.COMPANY);
roles.grant(AppRoles.COMPANIES_CREATE).create(ACLResourcesEnum.COMPANY);
roles.grant(AppRoles.COMPANIES_CREATE_OWN).createOwn(ACLResourcesEnum.COMPANY);
roles.grant(AppRoles.COMPANIES_EDIT).update(ACLResourcesEnum.COMPANY);
roles.grant(AppRoles.COMPANIES_EDIT_OWN).updateOwn(ACLResourcesEnum.COMPANY);

roles.grant(AppRoles.ORDERS_READ).read(ACLResourcesEnum.ORDER);
roles.grant(AppRoles.ORDERS_READ_OWN).readOwn(ACLResourcesEnum.ORDER);
roles.grant(AppRoles.ORDERS_CREATE).create(ACLResourcesEnum.ORDER);
roles.grant(AppRoles.ORDERS_CREATE_OWN).createOwn(ACLResourcesEnum.ORDER);
roles.grant(AppRoles.ORDERS_EDIT).update(ACLResourcesEnum.ORDER);
roles.grant(AppRoles.ORDERS_EDIT_OWN).updateOwn(ACLResourcesEnum.ORDER);

roles.grant(AppRoles.USERS_READ).read(ACLResourcesEnum.USER);
roles.grant(AppRoles.USERS_CREATE).create(ACLResourcesEnum.USER);
roles.grant(AppRoles.USERS_CREATE_OWN).createOwn(ACLResourcesEnum.USER);
roles.grant(AppRoles.USERS_EDIT).update(ACLResourcesEnum.USER);
roles.grant(AppRoles.USERS_EDIT_OWN).updateOwn(ACLResourcesEnum.USER);

roles.grant(AppRoles.ROLES_READ).read(ACLResourcesEnum.ROLE);
roles.grant(AppRoles.ROLES_EDIT).update(ACLResourcesEnum.ROLE);

roles.grant(AppRoles.CUSTOMER);
roles
    .grant(AppRoles.COMPANY_USER)
    .extend([AppRoles.PRODUCTS_READ_OWN, AppRoles.PRODUCTS_CREATE_OWN, AppRoles.PRODUCTS_EDIT_OWN]);
roles
    .grant(AppRoles.MASTER)
    .extend([
        AppRoles.PRODUCTS_READ,
        AppRoles.PRODUCTS_CREATE,
        AppRoles.PRODUCTS_EDIT,
        AppRoles.COMPANIES_READ,
        AppRoles.COMPANIES_CREATE,
        AppRoles.COMPANIES_EDIT,
        AppRoles.ORDERS_READ,
        AppRoles.ORDERS_CREATE,
        AppRoles.ORDERS_EDIT,
        AppRoles.USERS_READ,
        AppRoles.USERS_CREATE,
        AppRoles.USERS_EDIT,
        AppRoles.ROLES_READ,
        AppRoles.ROLES_EDIT,
    ]);

roles.grant(AppRoles.REGION_OWNER);

roles.lock();
