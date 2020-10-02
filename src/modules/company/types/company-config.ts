import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

@ObjectType()
export class CompanyConfig {
    @Field({ nullable: true })
    @IsString()
    phone: string;

    @Field({ nullable: true })
    @IsString()
    document: string;

    @Field({ nullable: true })
    @IsString()
    contact: string;

    @Field({ nullable: true })
    @IsString()
    email: string;

    @Field({ nullable: true })
    @IsString()
    deliveryTime: string;

    @Field({ nullable: true })
    @IsString()
    notificationSound: string;

    @Field({ nullable: true })
    @IsString()
    deliveryType: string;

    @Field({ nullable: true })
    @IsString()
    allowBuyClosed: string;

    @Field(() => Int, { nullable: true })
    @IsInt()
    allowBuyClosedTimeBefore: number;

    @Field({ nullable: true })
    @IsBoolean()
    deliveryHoursEnabled: boolean;
}
