import { Injectable } from '@nestjs/common';

import { IPermissionsScopes } from '../interfaces/guard-roles.interface';

@Injectable()
export class ExtractAclScopesHelper {
    execute(req): IPermissionsScopes {
        return {
            user: req?.user,
            company: req?.company,
        };
    }
}
