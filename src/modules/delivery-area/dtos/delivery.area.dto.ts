import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { GeoPoint } from '../../common/types/geo-point';
import { FilterableField } from '@nestjs-query/query-graphql';

@ObjectType('DeliveryArea')
export class DeliveryAreaDTO {
    @Field(() => ID)
    id: number;

    @FilterableField()
    name: string;

    @Field(() => GeoPoint, { nullable: true })
    center: GeoPoint;

    @Field(() => Float)
    radius: number;

    @FilterableField(() => Float, { allowedComparisons: ['lte', 'lt', 'gt', 'gte'] })
    price: number;

    @FilterableField()
    createdAt: Date;

    @FilterableField()
    companyId: number;

    @FilterableField()
    active: boolean;
}
