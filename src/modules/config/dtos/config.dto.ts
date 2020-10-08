import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsNumber } from 'class-validator';

export enum IConfigKeys {
    DELIVERY_PRICE_PER_KM = 'delivery_price_per_km',
    DELIVERY_PE_MIN_PRICE = 'delivery_pe_min_price',
    DELIVERY_NOTIFICATION_LIMIT = 'delivery_notification_limit',
    DELIVERY_NOTIFICATION_INTERVAL = 'delivery_notification_interval',
    ORDER_NOTIFICATION_LIMIT = 'order_notification_limit',
    ORDER_NOTIFICATION_INTERVAL = 'order_notification_interval',
    DELIVERY_GLOBAL_ACTIVE = 'delivery_global_active',
    NOTIFICATIONS_ENABLED = 'notifications_enabled',
}

@ObjectType()
export class ConfigDTO {
    @Field(() => Float, { nullable: true })
    @IsNumber()
    delivery_price_per_km?: number;

    @Field(() => Float, { nullable: true })
    @IsNumber()
    delivery_pe_min_price?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    delivery_notification_limit?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    delivery_notification_interval?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    order_notification_limit?: number;

    @Field(() => Int, { nullable: true })
    @IsInt()
    order_notification_interval?: number;

    @Field({ nullable: true })
    @IsBoolean()
    delivery_global_active?: boolean;

    @Field({ nullable: true })
    @IsBoolean()
    notifications_enabled?: boolean;
}
