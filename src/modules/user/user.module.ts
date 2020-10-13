import { Module } from '@nestjs/common';
import { UserFilterDTO } from './dtos/user.filter.dto';
import { UserRepositoryProvider } from './repositories/user.reporitory';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { ListUsersService } from './services/list.users.service';
import { QueryUsersResolver } from './resolvers/query.users.resolver';
import { CountUsersService } from './services/count.users.service';
import { UserActiveFilter } from './filters/user.active.filter';
import { UserCompanyFilter } from './filters/user.company.filter';
import { UserIdFilter } from './filters/user.id.filter';
import { UserAddressesLoader } from './loaders/user-address.loader';
import { AddressModule } from '../address/address.module';
import { UserResolver } from './resolvers/user.resolver';

@Module({
    imports: [UserFilterDTO, UserMetaDTO, AddressModule],
    providers: [
        // resolvers
        QueryUsersResolver,
        UserResolver,

        // loaders
        UserAddressesLoader,

        // filters
        UserActiveFilter,
        UserCompanyFilter,
        UserIdFilter,

        // services
        ListUsersService,
        CountUsersService,

        // repositories
        UserRepositoryProvider,
    ],
})
export class UserModule {}
