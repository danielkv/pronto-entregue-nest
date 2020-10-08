import { Module } from '@nestjs/common';
import { UserFilterDTO } from './dtos/user.filter.dto';
import { UserRepositoryProvider } from './repositories/user.reporitory';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { ListUsersService } from './services/list.users.service';
import { QueryUsersResolver } from './resolvers/query.users.resolver';
import { CountUsersService } from './services/count.users.service';
import { ProductRepositoryProvider } from '../product/repositories/product.repository';

@Module({
    imports: [UserFilterDTO, UserMetaDTO],
    providers: [
        // resolvers
        QueryUsersResolver,

        // services
        ListUsersService,
        CountUsersService,

        // repositories
        UserRepositoryProvider,
        ProductRepositoryProvider,
    ],
})
export class UserModule {}
