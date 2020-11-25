import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { CompanyMetaDTO } from './dtos/company-meta.dto';
import { CompanyMetaRepository } from './repositories/company-meta.repository';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([CompanyMetaRepository])],
            resolvers: [{ DTOClass: CompanyMetaDTO, EntityClass: CompanyMetaRepository }],
        }),
    ],
})
export class CompanyMetaModule {}
