import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

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
    @IsNumber()
    allowBuyClosedTimeBefore: number;

    @Field()
    @IsBoolean()
    deliveryHoursEnabled: boolean;
}
