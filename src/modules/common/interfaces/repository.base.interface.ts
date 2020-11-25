import { Repository } from 'typeorm';

export interface IRepositoryBase<Entity> extends Repository<Entity> {
    /**
     * Set name of table name will be auto created (used to apply filters)
     */
    setQueryBuilderTableName(name: string): void;
}
