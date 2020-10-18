import { Injectable } from '@nestjs/common';
import { ACGuard } from 'nest-access-control';
import { roles } from '../acl/roles';

@Injectable()
export class PopulateRoles extends ACGuard {
    async getUserRoles(context): Promise<string[]> {
        const request = context.switchToHttp().getRequest();
        const sessionRoles = [];

        if (request?.user?.roles?.length) {
            const userRoles = request.user.roles.filter(role => roles.hasRole(role));
            sessionRoles.push(...userRoles);
        }

        if (request?.company?.roles?.length) {
            const companyRoles = request.company.roles.filter(role => roles.hasRole(role));
            sessionRoles.push(...companyRoles);
        }

        console.log(sessionRoles);
        return sessionRoles;
    }
}
