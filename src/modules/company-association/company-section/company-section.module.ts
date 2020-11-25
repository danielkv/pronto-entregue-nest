import { Module } from '@nestjs/common';
import { NestjsQueryTypeOrmModule, TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { CompanySection } from './entities/company.type.entity';

TypeOrmQueryService;

@Module({
    imports: [NestjsQueryTypeOrmModule.forFeature([CompanySection])],
    providers: [],
})
export class CompanySectionModule {}
