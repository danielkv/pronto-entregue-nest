import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';
import { CompanySection } from '../../company/entities/company.type.entity';
import { CompanySectionFilterDTO } from '../dtos/compaany-section.filter.dto';

@Injectable()
export class CompanySectionActiveFilter
    implements IFilter<CompanySection, CompanySectionFilterDTO> {
    apply(
        query: QueryBuilderBase<CompanySection, CompanySectionFilterDTO>,
        filter?: CompanySectionFilterDTO,
    ): QueryBuilderBase<CompanySection, CompanySectionFilterDTO> {
        if (filter?.onlyActive === false) return query;

        return query.andWhere('companySection.active');
    }
}
