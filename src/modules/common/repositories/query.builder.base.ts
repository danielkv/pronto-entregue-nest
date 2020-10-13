import * as _ from 'lodash';

import { SelectQueryBuilder } from 'typeorm';
import { IFilter } from '../interfaces/IFilter';
import { PageInfo } from '../types/page-info';

export class QueryBuilderBase<Entity, EntityFilterDTO> extends SelectQueryBuilder<Entity> {
    query: SelectQueryBuilder<Entity>;

    constructor(query: SelectQueryBuilder<Entity>) {
        super(query);

        this.query = query;

        return this;
    }

    /**
     * Generic pipe function to Apply filters on query builder
     * @param filterObject Filter coming from frontend
     */
    applyFilters(
        filters: IFilter<Entity, EntityFilterDTO>[],
        filterObject: EntityFilterDTO,
    ): QueryBuilderBase<Entity, EntityFilterDTO> {
        if (!filters.length) return this;

        filters.forEach(filterInstance => {
            filterInstance.apply(this, filterObject);
        });

        return this;
    }

    /**
     * Apply pagination to query
     * @param query Query from QueryBuilder
     * @param pagination Pagination
     */
    applyPagination(pagination: PageInfo): QueryBuilderBase<Entity, EntityFilterDTO> {
        if (!pagination || _.isEmpty(pagination)) return this;

        const { skip, page, take } = pagination;

        if (!skip || page) this.query.skip(skip || page * take);

        if (take) this.query.take(take);

        return this;
    }
}
