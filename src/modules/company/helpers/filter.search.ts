import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { Brackets, SelectQueryBuilder } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CompanyFilter } from '../types/company-filter';

@Injectable()
export class FilterSearch implements IFilter<Company, CompanyFilter> {
    apply(query: SelectQueryBuilder<Company>, filter?: any): SelectQueryBuilder<Company> {
        if (!filter?.search) return query;

        return query.andWhere(
            new Brackets(qb =>
                qb
                    .where('company.name LIKE :search', {
                        search: `%${filter.search}%`,
                    })
                    .orWhere('company.displayName LIKE :search', {
                        search: `%${filter.search}%`,
                    }),
            ),
        );
    }
}
