import { SelectQueryBuilder } from 'typeorm';

export interface IFilter<T, U> {
    apply(query: SelectQueryBuilder<T>, filter: U): SelectQueryBuilder<T>;
}
