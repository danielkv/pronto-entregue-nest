import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';
import { NotificationTokenTypeEnum } from '../enums/notification-token-type.enum';
import { INotificationToken } from '../interfaces/notification-token.interface';

@ObjectType('NotificationToken')
export class NotificationTokenDTO implements INotificationToken {
    @Field()
    id: number;

    @FilterableField(() => NotificationTokenTypeEnum)
    type: NotificationTokenTypeEnum;

    @Field()
    value: string;

    @FilterableField()
    userId: number;

    @Field()
    createdAt: Date;
}
