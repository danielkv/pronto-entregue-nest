import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFilterDTO } from './dtos/user.filter.dto';
import { UserRepository } from './repositories/user.reporitory';
import { UserMetaRepository } from './repositories/user.meta.reporitory';
import { UserMetaDTO } from './dtos/user.meta.dto';
import { ListUsersService } from './services/list.users.service';
import { QueryUsersResolver } from './resolvers/query.users.resolver';
import { CountUsersService } from './services/count.users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserMetaRepository]),
        UserFilterDTO,
        UserMetaDTO,
    ],
    providers: [ListUsersService, CountUsersService, QueryUsersResolver],
})
export class UserModule {}
