import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { Address } from 'src/modules/address/entities/address.entity';

import { User } from '../../user-association/user/entities/user.entity';
import { UserAddressesLoader } from '../loaders/user-address.loader';

@Resolver(() => User)
export class UserResolver {
    constructor(private userAddressesLoader: UserAddressesLoader) {}

    @ResolveField(() => [Address], { nullable: 'items' })
    async addresses(@Parent() user: User): Promise<Address[]> {
        const userId = user.id;

        return this.userAddressesLoader.loader.load(userId);
    }
}
