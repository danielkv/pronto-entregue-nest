import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyUserTokenPayload } from '../interfaces/company-user-token-payload.interface';

@Injectable()
export class JwtCompanyAuthGuard extends AuthGuard('jwt-company') {
    handleRequest(err, companyAccess: CompanyUserTokenPayload, info, ctx) {
        const user = ctx.args[0].user;

        if (err || (companyAccess && !user)) throw err || new UnauthorizedException();

        if (companyAccess.userId !== user.userId) new UnauthorizedException();

        return user;
    }
}
