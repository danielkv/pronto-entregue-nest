import { Field, ID, InputType } from '@nestjs/graphql';
import { DeliveryStatusEnum } from '../enums/delivery.status.enum';

@InputType('DeliveryFilterInput')
export class DeliveryFilterDTO {
    @Field({ nullable: true })
    search?: string;

    @Field(() => [ID], { nullable: true })
    userId?: number | number[];

    @Field(() => [ID], { nullable: true })
    orderId?: number | number[];

    @Field(() => [ID], { nullable: true })
    companyId?: number | number[];

    @Field(() => [DeliveryStatusEnum], { nullable: true })
    status?: DeliveryStatusEnum[];
}
