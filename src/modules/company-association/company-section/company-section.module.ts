import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule, TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CompanySectionRepository } from './repositories/company-section.repository';
import { CompanySectionDTO } from './dtos/company-section.dto';
import { CompanySectionQueryArgs } from './types/company-section.query';

TypeOrmQueryService;

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([CompanySectionRepository])],
            resolvers: [
                {
                    DTOClass: CompanySectionDTO,
                    EntityClass: CompanySectionRepository,
                    read: {
                        QueryArgs: CompanySectionQueryArgs,
                    },
                },
            ],
        }),
    ],
})
export class CompanySectionModule {}
