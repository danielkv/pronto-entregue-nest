import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';
import { GeoPoint } from '../../common/types/geo-point';

@InputType('AddressInput')
export class AddressInputDTO {
    @IsInt()
    @FilterableField(() => ID, { nullable: true })
    id?: number;

    @IsString()
    @FilterableField({ nullable: true })
    name: string;

    @IsString()
    @FilterableField()
    street: string;

    @IsInt()
    @FilterableField(() => Int)
    number: number;

    @IsString()
    @FilterableField({ nullable: true })
    complement: string;

    @IsString()
    @FilterableField()
    district: string;

    @IsInt()
    @FilterableField(() => Int)
    zipcode: number;

    @IsString()
    @FilterableField()
    city: string;

    @IsString()
    @FilterableField()
    state: string;

    @Field(() => GeoPoint)
    location: GeoPoint;

    @IsString()
    @FilterableField({ nullable: true })
    reference: string;
}
