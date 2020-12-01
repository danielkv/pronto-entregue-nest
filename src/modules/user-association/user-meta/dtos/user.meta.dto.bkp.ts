import { IsBoolean, IsJSON, IsString } from 'class-validator';

export enum IUserMetaKeys {
    DOCUMENT = 'document',
    PHONE = 'phone',
    GOOGLE_USER_ID = '_google_userId',
    FACEBOOK_USER_ID = '_facebook_userId',
    DELIVERY_MAN_ENABLED = 'deliveryManEnabled',
    NOTIFICATION_TOKENS = 'notification_tokens',
    NOTIFICATION_DESKTOP_TOKENS = 'notification_desktop_tokens',
}

export class UserMetas {
    @IsString()
    document?: string;

    @IsString()
    phone?: string;

    @IsString()
    _google_userId?: string;

    @IsString()
    _facebook_userId?: string;

    @IsBoolean()
    deliveryManEnabled?: boolean;

    @IsJSON()
    notification_tokens?: Record<string, unknown>;

    @IsJSON()
    notification_desktop_tokens?: Record<string, unknown>;
}
