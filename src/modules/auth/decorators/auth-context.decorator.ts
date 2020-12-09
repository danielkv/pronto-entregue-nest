import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GetRequestHelper } from 'src/modules/common/helpers/get-request.helper';
import { ExtractAuthContextHelper } from '../helpers/extract-auth-context.helper';
import { IAuthContext } from '../interfaces/guard-roles.interface';

export const AuthContext = createParamDecorator(
    (data: unknown, context: ExecutionContext): IAuthContext => {
        const getRequestHelper = new GetRequestHelper();
        const extractRequestHelper = new ExtractAuthContextHelper();

        const permissionsScopes = extractRequestHelper.execute(getRequestHelper.execute(context));

        return permissionsScopes;
    },
);
