import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule, TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CompanySectionRepository } from './repositories/company-section.repository';
import { CompanySectionDTO } from './dtos/company-section.dto';
import { CompanySectionQueryArgs } from './types/company-section.query';
import { CompanySectionLocationFilter } from './filters/company-section-location.filter';
import { CompanyRepository } from '../company/repositories/company.repository';
import { CompanyLocationFilter } from '../company/filters/company.location.filter';
import { CompanySectionService } from './services/company-section.service';

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([CompanySectionRepository, CompanyRepository])],
            services: [CompanySectionLocationFilter, CompanyLocationFilter, CompanySectionService],
            resolvers: [
                {
                    DTOClass: CompanySectionDTO,
                    EntityClass: CompanySectionRepository,
                    ServiceClass: CompanySectionService,
                    read: {
                        QueryArgs: CompanySectionQueryArgs,
                    },
                },
            ],
        }),
    ],
})
export class CompanySectionModule {}
