import { Field, ID, InputType } from '@nestjs/graphql';

@InputType('OrderOptionGroupFilterInput')
export class OrderOptionGroupFilterDTO {
    @Field(() => [ID], { nullable: true })
    orderProductId?: number | number[];
}
