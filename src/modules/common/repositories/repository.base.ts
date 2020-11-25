import { Repository, SelectQueryBuilder } from 'typeorm';
import { IFilter } from '../interfaces/IFilter';

export abstract class RepositoryBase<Entity, EntityFilterDTO = void> extends Repository<Entity> {
    protected tablename: string | null = null;

    setQueryBuilderTableName(name: string): void {
        this.tablename = name;
    }

    /**
     * Generic pipe function to Apply filters on query builder
     * @param filter Filter coming from frontend
     */
    applyFilters(
        qb: SelectQueryBuilder<Entity>,
        filterHelpers: IFilter<Entity, EntityFilterDTO>[],
        filter: EntityFilterDTO,
    ): SelectQueryBuilder<Entity> {
        if (!filterHelpers.length) return qb;

        filterHelpers.forEach(filterInstance => {
            filterInstance.apply(qb, filter);
        });

        return qb;
    }
}
