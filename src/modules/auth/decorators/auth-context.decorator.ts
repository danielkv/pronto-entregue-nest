import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GetRequestHelper } from 'src/modules/common/helpers/get-request.helper';
import { ExtractAclScopesHelper } from '../helpers/extract-permissions-scopes.helper';
import { IAuthContext } from '../interfaces/guard-roles.interface';

export const AuthContext = createParamDecorator(
    (data: unknown, context: ExecutionContext): IAuthContext => {
        const getRequestHelper = new GetRequestHelper();
        const extractRequestHelper = new ExtractAclScopesHelper();

        const permissionsScopes = extractRequestHelper.execute(getRequestHelper.execute(context));

        return permissionsScopes;
    },
);
