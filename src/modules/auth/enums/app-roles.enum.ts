import { registerEnumType } from '@nestjs/graphql';

export enum AppRoles {
    PRODUCTS_READ = 'products_read',
    PRODUCTS_READ_OWN = 'products_read_own',
    PRODUCTS_CREATE = 'products_create',
    PRODUCTS_CREATE_OWN = 'products_create_own',
    PRODUCTS_EDIT = 'products_edit',
    PRODUCTS_EDIT_OWN = 'products_edit_own',

    COMPANIES_READ = 'companies_read',
    COMPANIES_READ_OWN = 'companies_read_own',
    COMPANIES_CREATE = 'companies_create',
    COMPANIES_CREATE_OWN = 'companies_create_own',
    COMPANIES_EDIT = 'companies_edit',
    COMPANIES_EDIT_OWN = 'companies_edit_own',

    ORDERS_READ = 'orders_read',
    ORDERS_READ_OWN = 'orders_read_own',
    ORDERS_CREATE = 'orders_create',
    ORDERS_CREATE_OWN = 'orders_create_own',
    ORDERS_EDIT = 'orders_edit',
    ORDERS_EDIT_OWN = 'orders_edit_own',

    ORDERS_STATUS_CHANGE = 'orders_status_change',
    ORDERS_STATUS_CHANGE_OWN = 'orders_status_change_own',

    USERS_READ = 'users_read',
    USERS_CREATE = 'users_read_create',
    USERS_CREATE_OWN = 'users_create_own',
    USERS_EDIT = 'users_edit',
    USERS_EDIT_OWN = 'users_edit_own',

    ROLES_READ = 'roles_read',
    ROLES_EDIT = 'roles_edit',

    CUSTOMER = 'customer',
    COMPANY_USER = 'company_user',
    REGION_OWNER = 'region_owner',
    MASTER = 'master',
}

registerEnumType(AppRoles, { name: 'AppRoles' });
