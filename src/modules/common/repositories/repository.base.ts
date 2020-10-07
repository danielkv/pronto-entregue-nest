import { QueryRunner, Repository } from 'typeorm';
import { IFilter } from '../interfaces/IFilter';

import { QueryBuilderBase } from './query.builder.base';

export abstract class RepositoryBase<Entity, EntityFilter = void> extends Repository<Entity> {
    filters: IFilter<Entity, EntityFilter>[] = [];

    createQueryBuilder(
        alias?: string,
        queryRunner?: QueryRunner,
    ): QueryBuilderBase<Entity, EntityFilter> {
        const query = super.createQueryBuilder(alias, queryRunner);

        return new QueryBuilderBase<Entity, EntityFilter>(query, this.filters);
    }

    /**
     * Set filters that will be applied to query
     * @param filters Filter to be applied
     */
    setFilters(filters: IFilter<Entity, EntityFilter>[]): void {
        this.filters = filters;
    }
}
