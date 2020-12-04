import { Field, InputType } from '@nestjs/graphql';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationToken } from '../interfaces/notification-token.interface';

@InputType('NotificationTokenInput')
export class NotificationTokenInputDTO implements INotificationToken {
    @Field(() => NotificationTokenTypeEnum)
    type: NotificationTokenTypeEnum;

    @Field()
    value: string;

    @Field()
    userId: number;
}
