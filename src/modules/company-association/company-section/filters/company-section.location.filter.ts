import { Inject, Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionFilterDTO } from '../dtos/company-section.filter.dto';
import { ICompanyRepository } from '../../company/interfaces/company.repository.interface';
import { CompanyLocationFilter } from '../../company/filters/company.location.filter';

@Injectable()
export class CompanySectionLocationFilter implements IFilter<CompanySection, CompanySectionFilterDTO> {
    constructor(
        @Inject('ICompanyRepository') private companyRepository: ICompanyRepository,
        private companyLocationFilter: CompanyLocationFilter,
    ) {}

    apply(
        query: QueryBuilderBase<CompanySection, CompanySectionFilterDTO>,
        filter?: CompanySectionFilterDTO,
    ): QueryBuilderBase<CompanySection, CompanySectionFilterDTO> {
        if (!filter?.location) return query;

        const companySubQuery = this.companyRepository.createQueryBuilder('company');

        this.companyRepository.applyAreasSelection(companySubQuery, filter.location);

        this.companyLocationFilter.apply(companySubQuery, { location: true });

        companySubQuery.select('company.id');

        return query
            .leftJoinAndSelect('companySection.companies', 'company')
            .andWhere(`company.id IN (${companySubQuery.getQuery()})`);
    }
}
