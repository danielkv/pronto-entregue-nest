import { ExecutionContext, Injectable, CanActivate, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GetRequestHelper } from 'src/modules/common/helpers/get-request.helper';
import { ExtractAclScopesHelper } from '../helpers/extract-permissions-scopes.helper';
import { IRole } from '../interfaces/guard-roles.interface';
import { AcCheckService } from '../services/validate-roles.service';

@Injectable()
export class ACGuard implements CanActivate {
    constructor(
        private validateRolesService: AcCheckService,
        private extractPermissionsScopesHelper: ExtractAclScopesHelper,
        private getRequestHelper: GetRequestHelper,
        private reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext) {
        const request = this.getRequestHelper.execute(context);
        const permissionScopes = this.extractPermissionsScopesHelper.execute(request);

        if (this.requireAuthentication(context) && !permissionScopes.user) throw new UnauthorizedException();

        const roles = this.getRolesFromMetadata(context);

        return this.validateRolesService.execute(roles, permissionScopes);
    }

    getRolesFromMetadata(context: ExecutionContext): IRole[] {
        return this.reflector.getAllAndMerge<IRole[]>('roles', [context.getHandler(), context.getClass()]);
    }

    requireAuthentication(context: ExecutionContext): boolean {
        return (
            this.reflector.getAllAndOverride<boolean>('useAuthentication', [
                context.getClass(),
                context.getHandler(),
            ]) === true
        );
    }
}
