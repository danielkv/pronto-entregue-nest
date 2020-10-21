import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GetRequestHelper {
    execute(context: ExecutionContext) {
        if (!context.getType || context.getType<GqlContextType>() === 'graphql') {
            const ctx = GqlExecutionContext.create(context);
            return ctx.getContext().req;
        } else {
            return context.switchToHttp().getRequest();
        }
    }
}
