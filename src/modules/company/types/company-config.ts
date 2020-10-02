import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

@ObjectType()
export class CompanyConfig {
    @Field()
    @IsString()
    phone: string;

    @Field()
    @IsString()
    document: string;

    @Field()
    @IsString()
    contact: string;

    @Field()
    @IsString()
    email: string;

    @Field()
    @IsString()
    deliveryTime: string;

    @Field()
    @IsString()
    notificationSound: string;

    @Field()
    @IsString()
    deliveryType: string;

    @Field()
    @IsBoolean()
    allowBuyClosed: boolean;

    @Field(() => Int)
    @IsInt()
    allowBuyClosedTimeBefore: number;

    @Field()
    @IsBoolean()
    deliveryHoursEnabled: boolean;
}
