import { SelectQueryBuilder } from 'typeorm';

export class QueryBuilderBase<Entity> extends SelectQueryBuilder<Entity> {
    protected query: SelectQueryBuilder<Entity>;

    constructor(query: SelectQueryBuilder<Entity>) {
        super(query);
        this.query = query;
    }
}
