import { Injectable, Inject } from '@nestjs/common';
import { AccessControl } from 'accesscontrol';

import { IAuthContext, IRole } from '../interfaces/guard-roles.interface';

@Injectable()
export class AcCheckService {
    constructor(@Inject('AccessControl') private accessControl: AccessControl) {}

    execute(roles: IRole | IRole[], authContext: IAuthContext): boolean {
        const rolesToCheck = Array.isArray(roles) ? roles : [roles];

        return rolesToCheck.every(role => this.checkPermission(role, authContext));
    }

    checkPermission(role: IRole, authContext: IAuthContext) {
        const permissions = this.getPermissionsFromContext(authContext);

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

    getPermissionsFromContext(authContext: IAuthContext): string[] {
        const permissions = [...authContext.user.permissions];

        if (authContext?.company?.permissions) permissions.push(...authContext.company.permissions);

        return permissions;
    }
}
