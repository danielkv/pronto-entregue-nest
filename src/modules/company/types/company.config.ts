import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export enum ICompanyConfigKeys {
    PHONE = 'phone',
    DOCUMENT = 'document',
    CONTACT = 'contact',
    EMAIL = 'email',
    DELIVERY_TIME = 'deliveryTime',
    NOTIFICATION_SOUND = 'notificationSound',
    DELIVERY_TYPE = 'deliveryType',
    ALLOW_BUY_CLOSED = 'allowBuyClosed',
    ALLOW_BUY_CLOSED_TIME_BEFORE = 'allowBuyClosedTimeBefore',
    DELIVERY_HOURS_ENABLED = 'deliveryHoursEnabled',
}

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
