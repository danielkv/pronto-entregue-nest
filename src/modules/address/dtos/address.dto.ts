import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';
import { GeoPoint } from '../../common/types/geo-point';

@InputType('AddressInput')
export class AddressDTO {
    @IsInt()
    @Field(() => Int)
    id?: number;

    @IsString()
    @Field({ nullable: true })
    name: string;

    @IsString()
    @Field()
    street: string;

    @IsInt()
    @Field(() => Int)
    number: number;

    @IsString()
    @Field({ nullable: true })
    complement: string;

    @IsString()
    @Field()
    district: string;

    @IsInt()
    @Field(() => Int)
    zipcode: number;

    @IsString()
    @Field()
    city: string;

    @IsString()
    @Field()
    state: string;

    @Field(() => GeoPoint)
    location: GeoPoint;

    @IsString()
    @Field({ nullable: true })
    reference: string;
}
