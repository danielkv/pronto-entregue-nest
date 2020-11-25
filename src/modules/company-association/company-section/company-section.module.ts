import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule, TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { CompanySectionRepository } from './repositories/company-section.repository';
import { CompanySectionDTO } from './dtos/company-section.dto';

TypeOrmQueryService;

@Module({
    imports: [
        NestjsQueryGraphQLModule.forFeature({
            imports: [NestjsQueryTypeOrmModule.forFeature([CompanySectionRepository])],
            resolvers: [
                {
                    DTOClass: CompanySectionDTO,
                    EntityClass: CompanySectionRepository,
                },
            ],
        }),
    ],
})
export class CompanySectionModule {}
