import { IsBoolean, IsInt, IsNumber } from 'class-validator';

export class ConfigTypesDTO {
    @IsNumber()
    delivery_price_per_km?: number;

    @IsNumber()
    delivery_pe_min_price?: number;

    @IsInt()
    delivery_notification_limit?: number;

    @IsInt()
    delivery_notification_interval?: number;

    @IsInt()
    order_notification_limit?: number;

    @IsInt()
    order_notification_interval?: number;

    @IsBoolean()
    delivery_global_active?: boolean;

    @IsBoolean()
    notifications_enabled?: boolean;
}
