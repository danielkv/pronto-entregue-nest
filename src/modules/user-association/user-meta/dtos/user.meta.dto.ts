import { Field, ObjectType } from '@nestjs/graphql';
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

@ObjectType()
export class UserMetaDTO {
    @Field({ nullable: true })
    @IsString()
    document?: string;

    @Field({ nullable: true })
    @IsString()
    phone?: string;

    @Field({ nullable: true })
    @IsString()
    _google_userId?: string;

    @Field({ nullable: true })
    @IsString()
    _facebook_userId?: string;

    @Field({ nullable: true })
    @IsBoolean()
    deliveryManEnabled?: boolean;

    @Field(() => Object, { nullable: true })
    @IsJSON()
    notification_tokens?: Record<string, unknown>;

    @Field(() => Object, { nullable: true })
    @IsJSON()
    notification_desktop_tokens?: Record<string, unknown>;
}
