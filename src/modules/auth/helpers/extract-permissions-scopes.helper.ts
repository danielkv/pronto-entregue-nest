import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { IPermissionsScopes } from '../interfaces/guard-roles.interface';

@Injectable()
export class ExtractRequestHelper {
    execute(context: ExecutionContext): IPermissionsScopes {
        const req = this.getRequest(context);

        return {
            user: req?.user,
            company: req?.company,
        };
    }

    getRequest(context: ExecutionContext) {
        if (context.getType<GqlContextType>() === 'graphql') {
            return GqlExecutionContext.create(context);
        } else {
            return context.switchToHttp().getRequest();
        }
    }
}
