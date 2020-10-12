import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('OrderProductFilterInput')
export class OrderProductFilterDTO {
    @Field(() => [ID], { nullable: true })
    orderId?: number | number[];
}
