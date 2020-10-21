import { ACLResourcesEnum } from '../enums/resources.enum';
import { CompanyUserTokenPayload } from './company-user-token-payload.interface';
import { UserTokenPayload } from './user-token-payload.interface';

export enum RoleScopeEnum {
    USER = 'user',
    COMPANY = 'company',
    REGION = 'region',
}

export interface IPermissionsScopes {
    user?: UserTokenPayload;
    company?: CompanyUserTokenPayload;
}

export interface IRole {
    possession?: 'any' | 'own';
    scope?: RoleScopeEnum;
    resource: ACLResourcesEnum;
    action: 'create' | 'update' | 'delete' | 'read';
    testOwner?(scopes: IPermissionsScopes, resource: any): boolean;
}
