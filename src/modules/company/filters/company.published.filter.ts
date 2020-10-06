import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { SelectQueryBuilder } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyFilter } from '../dtos/company.filter';

@Injectable()
export class CompanyPublishedFilter implements IFilter<Company, CompanyFilter> {
    apply(query: SelectQueryBuilder<Company>, filter?: CompanyFilter): SelectQueryBuilder<Company> {
        if (filter?.onlyPublished === false) return query;

        return query.andWhere('company.published');
    }
}
