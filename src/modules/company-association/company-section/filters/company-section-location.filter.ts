import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionExtraFilterDTO } from '../dtos/company-section.filter.dto';
import { CompanyLocationFilter } from '../../company/filters/company.location.filter';
import { CompanyRepository } from '../../company/repositories/company.repository';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class CompanySectionLocationFilter implements IFilter<CompanySection, CompanySectionExtraFilterDTO> {
    constructor(private companyRepository: CompanyRepository, private companyLocationFilter: CompanyLocationFilter) {}

    apply(
        query: SelectQueryBuilder<CompanySection>,
        filter?: CompanySectionExtraFilterDTO,
    ): SelectQueryBuilder<CompanySection> {
        if (!filter?.location) return query;

        const companySubQuery = this.companyRepository.createQueryBuilder('Company');

        this.companyRepository.applyAreasSelection(companySubQuery, filter.location);

        this.companyLocationFilter.apply(companySubQuery, { location: true });

        companySubQuery.select('Company.id');

        return query
            .leftJoinAndSelect('CompanySection.companies', 'Company')
            .andWhere(`Company.id IN (${companySubQuery.getQuery()})`);
    }
}
