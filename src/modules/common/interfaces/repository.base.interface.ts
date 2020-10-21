import { QueryRunner } from 'typeorm';
import { QueryBuilderBase } from '../repositories/query.builder.base';
import { IRepositoryFiltersOptions } from './IRepositoryFiltersOptions';
import { IRepositoryListOptions } from './IRepositoryListOptions';

export interface IRepositoryBase<Entity, EntityFilterDTO = void> {
    createQueryBuilder(alias?: string, queryRunner?: QueryRunner): QueryBuilderBase<Entity, EntityFilterDTO>;

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

    /**
     * Returns array of Users filtered and paginated
     *
     * @param options
     */
    getList(options?: IRepositoryListOptions<Entity, EntityFilterDTO>): Promise<Entity[]>;

    /**
     * Count filtered users
     *
     * @param filter filter
     */
    getCount(options: IRepositoryFiltersOptions<Entity, EntityFilterDTO>): Promise<number>;

    /**
     * Insert new row in entity's repository
     *
     * @param data entity data
     */
    createNew(data: Entity): Promise<Entity>;

    /**
     * Update row in entity's repository
     *
     * @param entityId entity id
     * @param data entity data
     */
    updateRow(entityId: number, data: Entity): Promise<Entity>;
}
