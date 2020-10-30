import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../common/interfaces/IFilter';
import { Company } from '../entities/company.entity';
import { CompanyFilterDTO } from '../dtos/company.filter.dto';
import { QueryBuilderBase } from '../../../common/repositories/query.builder.base';

@Injectable()
export class CompanyIdFilter implements IFilter<Company, CompanyFilterDTO> {
    apply(
        query: QueryBuilderBase<Company, CompanyFilterDTO>,
        filter?: CompanyFilterDTO,
    ): QueryBuilderBase<Company, CompanyFilterDTO> {
        if (!filter?.companyId) return query;

        return query.andWhereInIds(filter.companyId);
    }
}
