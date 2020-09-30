import { SelectQueryBuilder } from 'typeorm';
import { IFilter } from './IFilter';

export interface IFilterHelper<T, U> {
    apply(query: SelectQueryBuilder<T>, filter: U, filters: IFilter<T, U>[]);
}
