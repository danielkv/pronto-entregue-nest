import { SelectQueryBuilder } from 'typeorm';
import { IFilter } from '../interfaces/IFilter';
import * as _ from 'lodash';

export abstract class FilterHelper<Entity, U> {
    applyFilters(
        query: SelectQueryBuilder<Entity>,
        filter: U,
        filters: IFilter<Entity, U>[],
    ): SelectQueryBuilder<Entity> {
        if (!filter || _.isEmpty(filter)) return query;

        if (!filters.length) return query;

        filters.forEach(f => {
            f.apply(query, filter);
        });

        return query;
    }
}
