import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CompanyUserDTO } from './dtos/company.user.dto';
import { CompanyUser } from './entities/company.user.entity';

const companyUserTypeOrmModule = NestjsQueryTypeOrmModule.forFeature([CompanyUser]);

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [companyUserTypeOrmModule],
            resolvers: [{ DTOClass: CompanyUserDTO, EntityClass: CompanyUser }],
        }),
        companyUserTypeOrmModule,
    ],
    exports: [companyUserTypeOrmModule],
})
export class CompanyUserModule {}
