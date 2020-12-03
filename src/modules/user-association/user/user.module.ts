import { Module } from '@nestjs/common';
import { SortDirection } from '@nestjs-query/core';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { UserDTO } from './dtos/user.dto';
import { AddressModule } from 'src/modules/address/address.module';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { UserInputDTO } from './dtos/user-create.dto';

const userTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([User]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [userTypeOrmModule, AddressModule],
            services: [UserService],
            resolvers: [
                {
                    DTOClass: UserDTO,
                    CreateDTOClass: UserInputDTO,
                    UpdateDTOClass: UserInputDTO,
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
