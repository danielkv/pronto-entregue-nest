import { QueryRunner, Repository } from 'typeorm';
import { IFilter } from '../interfaces/IFilter';
import { IRepositoryBase } from '../interfaces/repository.base.interface';
import { PageInfo } from '../types/page-info';

import { QueryBuilderBase } from './query.builder.base';

export abstract class RepositoryBase<Entity, EntityFilterDTO = void> extends Repository<Entity>
    implements IRepositoryBase<Entity, EntityFilterDTO> {
    filters: IFilter<Entity, EntityFilterDTO>[] = [];

    createQueryBuilder(
        alias?: string,
        queryRunner?: QueryRunner,
    ): QueryBuilderBase<Entity, EntityFilterDTO> {
        const query = super.createQueryBuilder(alias, queryRunner);

        return new QueryBuilderBase<Entity, EntityFilterDTO>(query, this.filters);
    }

    setFilters(filters: IFilter<Entity, EntityFilterDTO>[]): void {
        this.filters = filters;
    }

    async get(entityId: number): Promise<Entity>;
    async get(entityId: number[]): Promise<Entity[]>;
    async get(entityId: any): Promise<Entity | Entity[]> {
        // create query builder
        const query = this.createQueryBuilder('user');

        // filter
        query.whereInIds(entityId);

        // load results
        const users = await query.getMany();

        // return results
        return Array.isArray(entityId) ? users : users[0];
    }

    getList(filter: EntityFilterDTO, pagination: PageInfo): Promise<Entity[]> {
        // create query builder
        const query = this.createQueryBuilder('user');

        // apply filters
        query.applyFilters(filter);

        // apply pagination
        query.applyPagination(pagination);

        // return results
        return query.getMany();
    }

    getCount(filter: EntityFilterDTO): Promise<number> {
        // create query builder
        const query = this.createQueryBuilder('user');

        // apply filters
        query.applyFilters(filter);

        // return count
        return query.getCount();
    }
}
