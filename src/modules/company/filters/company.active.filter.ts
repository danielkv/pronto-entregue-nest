import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { Company } from '../entities/company.entity';
import { CompanyFilter } from '../dtos/company.filter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';

@Injectable()
export class CompanyActiveFilter implements IFilter<Company, CompanyFilter> {
    apply(
        query: QueryBuilderBase<Company, CompanyFilter>,
        filter?: CompanyFilter,
    ): QueryBuilderBase<Company, CompanyFilter> {
        if (filter?.onlyActive === false) return query;

        return query.andWhere('company.active');
    }
}
