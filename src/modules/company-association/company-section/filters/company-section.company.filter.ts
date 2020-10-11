import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { CompanySection } from '../entities/company.type.entity';
import { CompanySectionFilterDTO } from '../dtos/compaany-section.filter.dto';

@Injectable()
export class CompanySectionCompanyFilter implements IFilter<CompanySection, CompanySectionFilterDTO> {
    apply(
        query: QueryBuilderBase<CompanySection, CompanySectionFilterDTO>,
        filter?: CompanySectionFilterDTO,
    ): QueryBuilderBase<CompanySection, CompanySectionFilterDTO> {
        if (!filter?.companyId) return query;

        const companyIds = !Array.isArray(filter.companyId) ? [filter.companyId] : filter.companyId;

        return query
            .leftJoinAndSelect('companySection.companies', 'company')
            .andWhere('company.id IN (:...companyIds)')
            .setParameters({ companyIds });
    }
}
