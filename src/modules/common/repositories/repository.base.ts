import { QueryRunner, Repository } from 'typeorm';
import { IRepositoryListOptions } from '../interfaces/IRepositoryListOptions';
import { IRepositoryFiltersOptions } from '../interfaces/IRepositoryFiltersOptions';
import { IRepositoryBase } from '../interfaces/repository.base.interface';

import { QueryBuilderBase } from './query.builder.base';
import { NotFoundException } from '@nestjs/common';

export abstract class RepositoryBase<Entity, EntityFilterDTO = void> extends Repository<Entity>
    implements IRepositoryBase<Entity, EntityFilterDTO> {
    protected tablename: string | null = null;

    createQueryBuilder(alias?: string, queryRunner?: QueryRunner): QueryBuilderBase<Entity, EntityFilterDTO> {
        const query = super.createQueryBuilder(alias, queryRunner);

        return new QueryBuilderBase<Entity, EntityFilterDTO>(query);
    }

    setQueryBuilderTableName(name: string): void {
        this.tablename = name;
    }

    async createNew(data: Entity): Promise<Entity> {
        await super.insert(data);

        return data;
    }

    async updateRow(entityId: number, newData: Entity): Promise<Entity> {
        const oldData = await this.findOne(entityId);
        if (!oldData) throw new NotFoundException();

        const mergedData = this.merge(oldData, newData);

        await super.save(mergedData);

        return mergedData;
    }

    async get(entityId: number): Promise<Entity>;
    async get(entityId: number[]): Promise<Entity[]>;
    async get(entityId: any): Promise<Entity | Entity[]> {
        // create query builder
        const query = this.createQueryBuilder(this.tablename);

        // filter
        query.whereInIds(entityId);

        // load results
        const users = await query.getMany();

        // return results
        return Array.isArray(entityId) ? users : users[0];
    }

    public getList(options?: IRepositoryListOptions<Entity, EntityFilterDTO>): Promise<Entity[]> {
        // create query builder
        const query = this.createQueryBuilder(this.tablename);

        // apply filters
        if (options.filter) query.applyFilters(options.filterHelpers, options.filter);

        // apply pagination
        if (options.pagination) query.applyPagination(options.pagination);

        if (options.orderBy) query.orderBy(options.orderBy);

        // return results
        return query.getMany();
    }

    getCount(options: IRepositoryFiltersOptions<Entity, EntityFilterDTO>): Promise<number> {
        // create query builder
        const query = this.createQueryBuilder(this.tablename);

        // apply filters
        query.applyFilters(options.filterHelpers, options.filter);

        // return count
        return query.getCount();
    }
}
