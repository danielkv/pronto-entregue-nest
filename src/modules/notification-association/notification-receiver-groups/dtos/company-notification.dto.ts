import { FilterableField } from '@nestjs-query/query-graphql';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('NotificationReceiver')
export class NotificationReceiverDTO {
    @FilterableField()
    id: number;

    @FilterableField()
    userId: number;

    @FilterableField()
    groupId: number;

    @FilterableField()
    removed: boolean;

    @Field()
    createdAt: Date;
}
