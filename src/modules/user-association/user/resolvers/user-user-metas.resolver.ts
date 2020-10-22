import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserMeta } from '../../user-meta/entities/user.meta.entity';
import { User } from '../entities/user.entity';
import { UserMetasLoader } from '../loaders/user-metas.loader';

@Resolver(() => User)
export class UserMetasResolver {
    constructor(private userMetasLoader: UserMetasLoader) {}

    @ResolveField(() => [UserMeta], { nullable: 'items' })
    metas(@Parent() user: User): Promise<UserMeta[]> {
        const userId = user.id;

        return this.userMetasLoader.loader.load(userId);
    }
}
