import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetRequestHelper } from 'src/modules/common/helpers/get-request.helper';

@Injectable()
export class JwtUserAuthGuard extends AuthGuard('jwt') {
    constructor(private getRequestHelper: GetRequestHelper) {
        super();
    }

    getRequest(context: ExecutionContext) {
        return this.getRequestHelper.execute(context);
    }

    handleRequest(err, user) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err) {
            throw err;
        }

        if (!user) return null;

        return user;
    }
}
