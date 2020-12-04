import { registerEnumType } from '@nestjs/graphql';

export enum NotificationTokenTypeEnum {
    MOBILE = 'mobile',
    BROWSER = 'browser',
}

registerEnumType(NotificationTokenTypeEnum, { name: 'NotificationTokenTypeEnum' });
