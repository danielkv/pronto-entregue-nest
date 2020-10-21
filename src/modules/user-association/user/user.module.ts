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

@Module({
    imports: [UserFilterDTO],
    providers: [
        // resolvers
        QueryUsersResolver,

        // filters
        UserActiveFilter,
        UserCompanyFilter,
        UserIdFilter,

        // services
        ListUsersService,
        CountUsersService,
        FindUserByEmailService,

        // repositories
        UserRepositoryProvider,
    ],
    exports: [FindUserByEmailService],
})
export class UserModule {}
