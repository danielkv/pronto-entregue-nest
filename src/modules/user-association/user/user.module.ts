import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.reporitory';

import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UserDTO } from './dtos/user.dto';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([UserRepository])],
            resolvers: [{ DTOClass: UserDTO, EntityClass: UserRepository }],
        }),
    ],
})
export class UserModule {}
