import * as _ from 'lodash';

import { SelectQueryBuilder } from 'typeorm';
import { IFilter } from '../interfaces/IFilter';
import { PageInfo } from '../types/page-info';

export class QueryBuilderBase<Entity, EntityFilter> extends SelectQueryBuilder<Entity> {
    query: SelectQueryBuilder<Entity>;

    constructor(query: SelectQueryBuilder<Entity>, private filters: IFilter<Entity, EntityFilter>[]) {
        super(query);

        this.query = query;

        return this;
    }

    /**
     * Generic pipe function to Apply filters on query builder
     * @param filter Filter coming from frontend
     */
    applyFilters(filter: EntityFilter): QueryBuilderBase<Entity, EntityFilter> {
        if (!this.filters.length) return this;

        this.filters.forEach(filterInstance => {
            filterInstance.apply(this, filter);
        });

        return this;
    }

    /**
     * Apply pagination to query
     * @param query Query from QueryBuilder
     * @param pagination Pagination
     */
    applyPagination(pagination: PageInfo): QueryBuilderBase<Entity, EntityFilter> {
        if (!pagination || _.isEmpty(pagination)) return this;

        const { skip, page, take } = pagination;

        if (!skip || page) this.query.skip(skip || page * take);

        if (take) this.query.take(take);

        return this;
    }
}
