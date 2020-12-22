import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('BusinessHour')
export class BusinessHourDTO {
    @FilterableField(() => ID)
    id: number;

    @FilterableField(() => ID)
    companyId: number;

    @FilterableField(() => Int)
    dayOfWeek: number;

    @Field()
    start: number;

    @Field()
    end: number;
}
