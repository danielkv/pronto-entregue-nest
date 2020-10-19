import { ExecutionContext, Injectable, CanActivate, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessControl } from 'accesscontrol';
import { ExtractRequestHelper } from '../helpers/extract-permissions-scopes.helper';

import { IPermissionsScopes, IRole, RoleScopeEnum } from '../interfaces/guard-roles.interface';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject('AccessControl') private acessControl: AccessControl,
        private extractPermissionsScopesHelper: ExtractRequestHelper,
    ) {}

    canActivate(context: ExecutionContext) {
        const permissionScopes = this.extractPermissionsScopesHelper.execute(context);

        const roles = this.getRolesFromMetadata(context);

        return roles.every(role => {
            const permissions = this.getPermissionsFromScope(permissionScopes, role.scope);

            const hasPermission = this.acessControl.permission({
                role: permissions,
                action: role.action,
                resource: role.resource,
                possession: role.possession,
            });

            return hasPermission.granted;
        });
    }

    getPermissionsFromScope(permissionsScopes: IPermissionsScopes, scope: RoleScopeEnum): string[] {
        if (!permissionsScopes.user) return [];

        const permissions = [...permissionsScopes.user.permissions];

        if (scope === RoleScopeEnum.COMPANY && permissionsScopes?.company?.permissions)
            permissions.push(...permissionsScopes.company.permissions);

        return permissions;
    }

    getRolesFromMetadata(context: ExecutionContext): IRole[] {
        return this.reflector.getAllAndMerge<IRole[]>('roles', [context.getHandler(), context.getClass()]);
    }
}
