import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GetRequestHelper } from 'src/modules/common/helpers/get-request.helper';
import { CompanyUserTokenPayload } from '../interfaces/company-user-token-payload.interface';

@Injectable()
export class JwtCompanyAuthGuard extends AuthGuard('jwt-company') {
    constructor(private getRequestHelper: GetRequestHelper) {
        super();
    }

    getRequest(context: ExecutionContext) {
        return this.getRequestHelper.execute(context);
    }

    handleRequest(err, companyAccess: CompanyUserTokenPayload, info, ctx) {
        const req = this.getRequest(ctx);

        const user = req.user;

        if (!user) return null;

        if (err || (companyAccess && !user)) throw err || new UnauthorizedException();

        if (companyAccess.userId !== user.userId) new UnauthorizedException();

        return user;
    }
}
