import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CompanyUserDTO } from './dtos/company.user.dto';
import { CompanyUserRepository } from './repositories/company-user.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([CompanyUserRepository])],
            resolvers: [{ DTOClass: CompanyUserDTO, EntityClass: CompanyUserRepository }],
        }),
    ],
})
export class CompanyUserModule {}
