import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GetRequestHelper } from 'src/modules/common/helpers/get-request.helper';
import { AppRoles } from '../enums/app-roles.enum';
import { ExtractAuthContextHelper } from '../helpers/extract-auth-context.helper';
import { ExtractPermissionsHelper } from '../helpers/extract-permissions.helper';

export const AuthPermissions = createParamDecorator((data: unknown, context: ExecutionContext): AppRoles[] => {
    const getRequestHelper = new GetRequestHelper();
    const extractRequestHelper = new ExtractAuthContextHelper();
    const extractPermissionsHelper = new ExtractPermissionsHelper();

    const authContext = extractRequestHelper.execute(getRequestHelper.execute(context));

    const permissions = extractPermissionsHelper.execute(authContext);

    return permissions;
});
