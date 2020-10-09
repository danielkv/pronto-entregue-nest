import { Field, ID, InputType } from '@nestjs/graphql';
import { OrderStatusEnum } from '../enums/order.status.enum';
import { OrderTypeEnum } from '../enums/order.type.enum';

@InputType('OrderFilterInput')
export class OrderFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field(() => [ID], { nullable: true })
    userId?: number | number[];

    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field(() => [OrderStatusEnum], { nullable: true })
    status?: OrderStatusEnum[];

    @Field(() => [OrderTypeEnum], { nullable: true })
    type?: OrderTypeEnum[];
}
