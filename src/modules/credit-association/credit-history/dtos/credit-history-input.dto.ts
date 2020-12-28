import { Float, ID, InputType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@InputType('CreditHistoryInput')
export class CreditHistoryInputDTO {
    @FilterableField(() => Float)
    value: number;

    @FilterableField()
    history: string;

    @FilterableField(() => ID)
    userId: number;
}
