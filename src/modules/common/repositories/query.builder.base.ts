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
     * @param filter Filter coming from frontend
     */
    applyFilters(
        filterHelpers: IFilter<Entity, EntityFilterDTO>[],
        filter: EntityFilterDTO,
    ): QueryBuilderBase<Entity, EntityFilterDTO> {
        if (!filterHelpers.length) return this;

        filterHelpers.forEach(filterInstance => {
            filterInstance.apply(this, filter);
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

        if (take) {
            if (skip ?? page) this.skip(skip ?? page * take);

            this.take(take);
        }

        return this;
    }
}
