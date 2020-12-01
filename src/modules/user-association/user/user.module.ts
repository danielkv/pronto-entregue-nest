import { Module } from '@nestjs/common';
import { SortDirection } from '@nestjs-query/core';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UserDTO } from './dtos/user.dto';
import { AddressModule } from 'src/modules/address/address.module';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';

const userTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([User]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [userTypeOrmModule, AddressModule],
            services: [UserService],
            resolvers: [
                {
                    DTOClass: UserDTO,
                    EntityClass: User,
                    ServiceClass: UserService,
                    create: { many: { disabled: true } },
                    delete: { many: { disabled: true } },
                    update: { many: { disabled: true } },
                    read: {
                        defaultFilter: { active: { is: true } },
                        defaultSort: [{ field: 'createdAt', direction: SortDirection.DESC }],
                    },
                },
            ],
        }),
        userTypeOrmModule,
    ],
    exports: [userTypeOrmModule],
})
export class UserModule {}
