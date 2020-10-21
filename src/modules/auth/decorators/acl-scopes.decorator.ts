import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GetRequestHelper } from 'src/modules/common/helpers/get-request.helper';
import { ExtractAclScopesHelper } from '../helpers/extract-permissions-scopes.helper';
import { IPermissionsScopes } from '../interfaces/guard-roles.interface';

export const AclScopes = createParamDecorator(
    (data: unknown, context: ExecutionContext): IPermissionsScopes => {
        const getRequestHelper = new GetRequestHelper();
        const extractRequestHelper = new ExtractAclScopesHelper();

        const permissionsScopes = extractRequestHelper.execute(getRequestHelper.execute(context));

        return permissionsScopes;
    },
);
