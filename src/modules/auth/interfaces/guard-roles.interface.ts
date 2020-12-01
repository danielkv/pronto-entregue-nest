import { ACLResourcesEnum } from '../enums/resources.enum';
import { AuthenticatedCompany } from './authenticated-company.interface';
import { AuthenticatedUser } from './authenticated-user.interface';

export interface IAuthContext {
    user?: AuthenticatedUser;
    company?: AuthenticatedCompany;
}

export interface IRole {
    possession?: 'any' | 'own';
    resource: ACLResourcesEnum;
    action: 'create' | 'update' | 'delete' | 'read';
}
