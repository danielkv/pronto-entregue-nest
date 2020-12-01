import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.reporitory';
import { SortDirection } from '@nestjs-query/core';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UserDTO } from './dtos/user.dto';
import { AddressModule } from 'src/modules/address/address.module';
import { UserService } from './services/user.service';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([UserRepository]), AddressModule],
            services: [UserService],
            resolvers: [
                {
                    DTOClass: UserDTO,
                    EntityClass: UserRepository,
                    ServiceClass: UserService,
                    create: { many: { disabled: true } },
                    delete: { many: { disabled: true } },
                    read: {
                        defaultFilter: { active: { is: true } },
                        defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
                    },
                },
            ],
        }),
    ],
})
export class UserModule {}
