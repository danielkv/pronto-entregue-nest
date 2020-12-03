import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { GetRequestHelper } from 'src/modules/common/helpers/get-request.helper';
import { AuthenticatedCompany } from '../interfaces/authenticated-company.interface';

@Injectable()
export class JwtCompanyAuthGuard extends AuthGuard('jwt-company') {
    constructor(private getRequestHelper: GetRequestHelper) {
        super();
    }

    getRequest(context: ExecutionContext) {
        return this.getRequestHelper.execute(context);
    }

    handleRequest(err, companyAccess: AuthenticatedCompany, info, ctx) {
        if (err) throw err;

        const req = this.getRequest(ctx);

        const user = req.user;

        if (!user) return null;

        if (companyAccess && !user) throw new UnauthorizedException();

        if (companyAccess.userId !== user.userId)
            throw new UnauthorizedException('Esse usuário não está autenticado nesse estabelecimento');

        return user;
    }
}
