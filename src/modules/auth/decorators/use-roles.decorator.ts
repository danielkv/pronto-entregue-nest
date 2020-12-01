import { SetMetadata } from '@nestjs/common';
import { IRole } from '../interfaces/guard-roles.interface';

export const UseRoles = (...roles: IRole[]) => {
    const mappedRoles: IRole[] = roles.filter(role => ({
        possession: role.possession || 'any',
    }));

    return SetMetadata('roles', mappedRoles);
};
