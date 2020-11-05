import { Module } from '@nestjs/common';
import { UserFilterDTO } from './dtos/user.filter.dto';
import { UserRepositoryProvider } from './repositories/user.reporitory';
import { ListUsersService } from './services/list.users.service';
import { QueryUsersResolver } from './resolvers/query.users.resolver';
import { CountUsersService } from './services/count.users.service';
import { UserActiveFilter } from './filters/user.active.filter';
import { UserCompanyFilter } from './filters/user.company.filter';
import { UserIdFilter } from './filters/user.id.filter';
import { FindUserByEmailService } from './services/find-user-by-email.service';
import { UserMetaModule } from '../user-meta/user-meta.module';
import { CreateUserService } from './services/create-user.service';
import { MutationUsersResolver } from './resolvers/mutation.users.resolver';
import { UpdateUserService } from './services/update-user.service';
import { UserMetasResolver } from './resolvers/user-user-metas.resolver';
import { AddressModule } from 'src/modules/address/address.module';
import { GetUserService } from './services/get.user.service';
import { UserLoader } from './loaders/user.loader';
import { UserMetasLoader } from './loaders/user-metas.loader';

@Module({
    imports: [UserFilterDTO, UserMetaModule, AddressModule],
    providers: [
        // resolvers
        QueryUsersResolver,
        MutationUsersResolver,
        UserMetasResolver,

        // loaders
        UserLoader,
        UserMetasLoader,

        // filters
        UserActiveFilter,
        UserCompanyFilter,
        UserIdFilter,

        // services
        ListUsersService,
        CountUsersService,
        FindUserByEmailService,
        CreateUserService,
        UpdateUserService,
        GetUserService,

        // repositories
        UserRepositoryProvider,
    ],
    exports: [FindUserByEmailService, GetUserService, UserLoader],
})
export class UserModule {}
