import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GeoPoint } from '../types/geo-point';

@ObjectType()
export class AbstractAddress {
    @Field()
    name: string | null;

    @Field()
    street: string | null;

    @Field(() => Int)
    number: number | null;

    @Field({ nullable: true })
    complement: string | null;

    @Field()
    district: string | null;

    @Field(() => Int)
    zipcode: number | null;

    @Field()
    city: string | null;

    @Field()
    state: string | null;

    @Field(() => GeoPoint)
    location: GeoPoint;

    @Field()
    reference: string | null;
}
