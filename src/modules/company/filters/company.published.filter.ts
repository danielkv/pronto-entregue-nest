import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { Company } from '../entities/company.entity';
import { CompanyFilter } from '../dtos/company.filter';
import { QueryBuilderBase } from 'src/modules/common/repositories/query.builder.base';

@Injectable()
export class CompanyPublishedFilter implements IFilter<Company, CompanyFilter> {
    apply(
        query: QueryBuilderBase<Company, CompanyFilter>,
        filter?: CompanyFilter,
    ): QueryBuilderBase<Company, CompanyFilter> {
        if (filter?.onlyPublished === false) return query;

        return query.andWhere('company.published');
    }
}
