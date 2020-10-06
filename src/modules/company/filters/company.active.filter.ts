import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { SelectQueryBuilder } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyFilter } from '../types/company.filter';

@Injectable()
export class CompanyActiveFilter implements IFilter<Company, CompanyFilter> {
    apply(query: SelectQueryBuilder<Company>, filter?: CompanyFilter): SelectQueryBuilder<Company> {
        if (filter?.onlyActive === false) return query;

        return query.andWhere('company.active');
    }
}
