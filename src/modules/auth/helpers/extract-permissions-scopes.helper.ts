import { Injectable } from '@nestjs/common';

import { IAuthContext } from '../interfaces/guard-roles.interface';

@Injectable()
export class ExtractAclScopesHelper {
    execute(req): IAuthContext {
        return {
            user: req?.user,
            company: req?.company,
        };
    }
}
