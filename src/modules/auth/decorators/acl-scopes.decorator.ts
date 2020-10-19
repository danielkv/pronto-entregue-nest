import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtractRequestHelper } from '../helpers/extract-permissions-scopes.helper';
import { IPermissionsScopes } from '../interfaces/guard-roles.interface';

export const AclScopes = createParamDecorator(
    (data: unknown, context: ExecutionContext): IPermissionsScopes => {
        const extractRequestHelper = new ExtractRequestHelper();

        const permissionsScopes = extractRequestHelper.execute(context);

        return permissionsScopes;
    },
);
