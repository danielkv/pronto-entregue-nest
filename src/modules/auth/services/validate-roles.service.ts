import { Injectable, Inject } from '@nestjs/common';
import { AccessControl } from 'accesscontrol';
import { ExtractPermissionsHelper } from '../helpers/extract-permissions.helper';

import { IAuthContext, IRole } from '../interfaces/guard-roles.interface';

@Injectable()
export class AcCheckService {
    constructor(
        @Inject('AccessControl') private accessControl: AccessControl,
        private extractPermissionsHelper: ExtractPermissionsHelper,
    ) {}

    execute(roles: IRole | IRole[], authContext: IAuthContext): boolean {
        const rolesToCheck = Array.isArray(roles) ? roles : [roles];

        return rolesToCheck.every(role => this.checkPermission(role, authContext));
    }

    checkPermission(role: IRole, authContext: IAuthContext) {
        const permissions = this.extractPermissionsHelper.execute(authContext);

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
}
