import { DeepPartial, QueryRunner } from 'typeorm';
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
     * Saves all given entities in the database.
     * If entities do not exist in the database then inserts, otherwise updates.
     */
    save<T extends DeepPartial<Entity>>(entities: T[]): Promise<T[]>;

    /**
     * Saves a given entity in the database.
     * If entity does not exist in the database then inserts, otherwise updates.
     */
    save<T extends DeepPartial<Entity>>(entity: T): Promise<T>;

    /**
     * Creates a new entities and copies all entity properties from given objects into their new entities.
     * Note that it copies only properties that present in entity schema.
     */
    create(entityLike: DeepPartial<Entity>[]): Entity[];
    /**
     * Creates a new entity instance and copies all entity properties from this object into a new entity.
     * Note that it copies only properties that present in entity schema.
     */
    create(entityLike: DeepPartial<Entity>): Entity;

    /**
     * Merges multiple entities (or entity-like objects) into a given entity.
     */
    merge(mergeIntoEntity: Entity, ...entityLikes: DeepPartial<Entity>[]): Entity;
}
