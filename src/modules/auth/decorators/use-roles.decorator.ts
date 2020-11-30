import { SetMetadata } from '@nestjs/common';
import { IRole } from '../interfaces/guard-roles.interface';

export const UseRoles = (...roles: IRole[]) => {
    const mappedRoles: IRole[] = roles.filter(role => ({
        possession: role.possession || 'any',
        scope: role.scope || 'user',
    }));

    return SetMetadata('roles', mappedRoles);
};
