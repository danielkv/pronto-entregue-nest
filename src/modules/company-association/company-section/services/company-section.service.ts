import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { CompanySectionDTO } from '../dtos/company-section.dto';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionLocationFilter } from '../filters/company-section-location.filter';
import { CompanySectionRepository } from '../repositories/company-section.repository';
import { CompanySectionQueryArgs } from '../types/company-section.query';

@QueryService(CompanySectionDTO)
export class CompanySectionService extends TypeOrmQueryService<CompanySection> {
    constructor(
        private companySectionRepository: CompanySectionRepository,
        private companySectionLocationFilter: CompanySectionLocationFilter,
    ) {
        super(companySectionRepository);
    }

    async query(query: CompanySectionQueryArgs): Promise<CompanySection[]> {
        let qb = this.filterQueryBuilder.select(query);

        qb = this.companySectionRepository.applyFilters(qb, [this.companySectionLocationFilter], query.extraFilter);

        qb.addOrderBy('RAND()');

        return qb.getMany();
    }

    /* async count(filter: CompanySectionQueryArgs['filter']): Promise<number> {
        let qb = this.filterQueryBuilder.select({ filter });

        qb = this.companySectionRepository.applyFilters(qb, [this.companySectionLocationFilter], query.extraFilter);

        qb.addOrderBy('RAND()');

        return qb.getCount();
    } */
}
