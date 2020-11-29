import { Float, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('CreditHistory')
export class CreditHistoryDTO {
    @FilterableField(() => ID)
    id: number;

    @FilterableField(() => Float)
    value: number;

    @FilterableField()
    history: string;

    @FilterableField()
    createdAt: Date;

    @FilterableField(() => ID)
    userId: number;
}
