import * as _ from 'lodash';

import { QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
import { IFilter } from '../interfaces/IFilter';
import { PageInfo } from '../types/page-info';
import { QueryBuilderBase } from './query.builder.base';

export abstract class RepositoryBase<Entity, EntityFilter = void> extends Repository<Entity> {
    filters: IFilter<Entity, EntityFilter>[];

    createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity> {
        const query = super.createQueryBuilder(alias, queryRunner);
        return new QueryBuilderBase<Entity>(query);
    }

    /**
     * Set filters that will be applied to query
     * @param filters Filter to be applied
     */
    setFilters(filters: IFilter<Entity, EntityFilter>[]): void {
        this.filters = filters;
    }

    /**
     * Generic pipe function to Apply filters on query builder
     * @param query Query from QueryBuilder
     * @param filter Filter coming from frontend
     */
    applyFilters(
        query: SelectQueryBuilder<Entity>,
        filter: EntityFilter,
    ): SelectQueryBuilder<Entity> {
        if (!this.filters.length) return query;

        this.filters.forEach(filterInstance => {
            filterInstance.apply(query, filter);
        });

        return query;
    }

    /**
     * Apply pagination to query
     * @param query Query from QueryBuilder
     * @param pagination Pagination
     */
    applyPagination(
        query: SelectQueryBuilder<Entity>,
        pagination: PageInfo,
    ): SelectQueryBuilder<Entity> {
        if (!pagination || _.isEmpty(pagination)) return query;

        const { skip, page, take } = pagination;

        if (!skip || page) query.skip(skip || page * take);

        if (take) query.take(take);

        return query;
    }
}
