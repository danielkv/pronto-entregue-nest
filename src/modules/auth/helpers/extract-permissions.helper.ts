import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppRoles } from '../enums/app-roles.enum';

import { IAuthContext } from '../interfaces/guard-roles.interface';

@Injectable()
export class ExtractPermissionsHelper {
    execute(authContext: IAuthContext): AppRoles[] {
        if (!authContext?.user) throw new UnauthorizedException('Nenhum usuário autenticado');

        const permissions = [...authContext.user.permissions];

        if (authContext?.company?.permissions) permissions.push(...authContext.company.permissions);

        return permissions;
    }
}
