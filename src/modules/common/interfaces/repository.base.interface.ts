import { QueryRunner } from 'typeorm';
import { QueryBuilderBase } from '../repositories/query.builder.base';
import { PageInfo } from '../types/page-info';
import { IFilter } from './IFilter';

export interface IRepositoryBase<Entity, EntityFilterDTO = void> {
    filters: IFilter<Entity, EntityFilterDTO>[];

    createQueryBuilder(
        alias?: string,
        queryRunner?: QueryRunner,
    ): QueryBuilderBase<Entity, EntityFilterDTO>;

    /**
     * Set filters that will be applied to query
     * @param filters Filter to be applied
     */
    setFilters(filters: IFilter<Entity, EntityFilterDTO>[]): void;

    /**
     * Set name of table name will be auto created (used to apply filters)
     */
    setQueryBuilderTableName(name: string): void;

    /**
     * Returns one or more instances of Entity
     * @param entityId Entity ID or array with user IDs
     */
    get(entityId: number): Promise<Entity>;
    get(entityId: number[]): Promise<Entity[]>;
    get(entityId: any): Promise<Entity | Entity[]>;

    /**
     * Returns array of Users filtered and paginated
     *
     * @param filter filter
     * @param pagination pagination
     */
    getList(filter: EntityFilterDTO, pagination: PageInfo): Promise<Entity[]>;

    /**
     * Count filtered users
     *
     * @param filter filter
     */
    getCount(filter: EntityFilterDTO): Promise<number>;
}
