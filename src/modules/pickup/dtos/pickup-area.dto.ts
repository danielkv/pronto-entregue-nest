import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('PickUpArea')
export class PickUpAreaDTO {
    @FilterableField(() => ID)
    id: number;

    @FilterableField()
    name: string;

    @Field()
    center: string;

    @Field(() => Float)
    radius: number;

    @FilterableField()
    createdAt: Date;

    @FilterableField()
    companyId: number;

    @FilterableField()
    active: boolean;
}
