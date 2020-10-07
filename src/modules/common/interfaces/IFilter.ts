import { QueryBuilderBase } from '../repositories/query.builder.base';

export interface IFilter<T, U> {
    apply(
        query: QueryBuilderBase<T, U>,
        filter: U,
    ): QueryBuilderBase<T, U> | Promise<QueryBuilderBase<T, U>>;
}
