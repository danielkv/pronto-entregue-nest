import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyUserTokenPayload } from '../interfaces/company-user-token-payload.interface';

@Injectable()
export class JwtCompanyAuthGuard extends AuthGuard('jwt-company') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }
    handleRequest(err, companyAccess: CompanyUserTokenPayload, info, ctx) {
        const user = ctx.args[0].user;

        if (err || !user) throw err || new UnauthorizedException();

        // You can throw an exception based on either "info" or "err" arguments

        if (companyAccess) user.permissions = [...user.permissions, ...companyAccess.permissions];

        return user;
    }
}
