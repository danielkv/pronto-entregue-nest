import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { IFilter } from '../interfaces/IFilter';
import { IFilterHelper } from '../interfaces/IFilterHelper';
import * as _ from 'lodash';

@Injectable()
export class FilterHelper<Entity, U> implements IFilterHelper<Entity, U> {
    apply(
        query: SelectQueryBuilder<Entity>,
        filter: U,
        filters: IFilter<Entity, U>[],
    ): SelectQueryBuilder<Entity> {
        if (!filter || _.isEmpty(filter)) return query;

        if (!filters.length) return query;

        let newQuery = query;

        filters.forEach(f => {
            newQuery = f.apply(query, filter);
        });

        return newQuery;
    }
}
