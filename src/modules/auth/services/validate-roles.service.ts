import { Injectable, Inject } from '@nestjs/common';
import { AccessControl, IQueryInfo } from 'accesscontrol';

import { IPermissionsScopes, IRole, RoleScopeEnum } from '../interfaces/guard-roles.interface';

@Injectable()
export class AcCheckService {
    constructor(@Inject('AccessControl') private accessControl: AccessControl) {}

    execute(roles: IRole | IRole[], permissionScopes: IPermissionsScopes): boolean {
        const rolesToCheck = Array.isArray(roles) ? roles : [roles];

        return rolesToCheck.every(role => this.checkPermission(role, permissionScopes));
    }

    checkPermission(role: IRole, permissionScopes: IPermissionsScopes) {
        const permissions = this.getPermissionsFromScope(permissionScopes, role.scope);

        if (!permissions.length) return false;

        const hasPermission = this.accessControl.permission({
            role: permissions,
            action: role.action,
            resource: role.resource,
            possession: role.possession,
        });

        //

        return hasPermission.granted;
    }

    checkOwnerPermission<Resource>(
        roles: IRole | IRole[],
        permissionScopes: IPermissionsScopes,
        resource: Resource,
    ): boolean {
        const rolesToCheck = Array.isArray(roles) ? roles : [roles];

        return rolesToCheck.every(role => {
            const rolesToCheck: IRole = { ...role, possession: 'any' };

            return (
                this.checkPermission(rolesToCheck, permissionScopes) ||
                (role.testOwner && role.testOwner(permissionScopes, resource))
            );
        });
    }

    getPermissionsFromScope(permissionsScopes: IPermissionsScopes, scope: RoleScopeEnum): string[] {
        if (!permissionsScopes.user) return [];

        const permissions = [...permissionsScopes.user.permissions];

        if (scope === RoleScopeEnum.COMPANY && permissionsScopes?.company?.permissions)
            permissions.push(...permissionsScopes.company.permissions);

        return permissions;
    }
}
