import { Injectable } from '@nestjs/common';
import { IFilter } from '../../common/interfaces/IFilter';
import { SelectQueryBuilder } from 'typeorm';

@Injectable()
export class FilterSearch<T> implements IFilter<T, any> {
    apply(query: SelectQueryBuilder<T>, filter?: any): SelectQueryBuilder<T> {
        if (!filter?.search) return query;

        return query
            .where('company.name LIKE :search', {
                search: `%${filter.search}%`,
            })
            .orWhere('company.displayName LIKE :search', {
                search: `%${filter.search}%`,
            });
    }
}
